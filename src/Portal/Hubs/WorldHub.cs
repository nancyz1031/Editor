using Editor.Hubs.Model;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Editor.Hubs
{
    public class WorldHub : Hub
    {
        private const string SystemMessageFunc = "SystemMessage";
        private const string UpdateRanksFunc = "UpdateRanks";
        private const string UpdatePeasFunc = "UpdatePeas";
        private const string StartGameFunc = "StartGame";
        private const string PlayerMoveToFunc = "PlayerMoveTo";
        private const string UpdatePlayersFunc = "UpdatePlayers";

        private static object SyncRoot = new object();
        private static object RankSyncRoot = new object();
        private static World world = new World();

        private void SendMessage(string message)
        {
            Clients.All.SendAsync(SystemMessageFunc, message);
        }

        private void RefreshRanks()
        {
            lock (RankSyncRoot)
            {
                var oldRanks = JsonConvert.SerializeObject(world.Ranks);
                world.Ranks = world.Players.Values.ToList()
                    .Select(user => new Rank() { Id = user.Id, UserName = user.Name, Color = user.Color, Score = user.Score })
                    .OrderBy(rank => rank.Score)
                    .ToList();
                var newRanks = JsonConvert.SerializeObject(world.Ranks);

                if (oldRanks != newRanks)
                {
                    Clients.All.SendAsync(UpdateRanksFunc, world.Ranks);
                }
            }
        }

        private void RefreshPlayers()
        {
            Clients.All.SendAsync(UpdatePlayersFunc, world.Players);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            this.PlayerLeave(GetPlayerId());
            return base.OnDisconnectedAsync(exception);
        }

        public void UserJoin(string userName, string color)
        {
            var id = Guid.NewGuid().ToString();
            SetPlayerId(id);
            var user = new Player(id, userName, color);
            world.Players[user.Id] = user;
            Start();
            TryFillPeas();
            RefreshRanks();
            RefreshPlayers();
        }

        public void Start()
        {
            if (world.Players.TryGetValue(GetPlayerId(), out Player player))
            {
                player.Score = 0;
                player.Position = GetRandomPosition();
                SendMessage($"{player.Name} joined game");
                Clients.Caller.SendAsync(StartGameFunc, player.Id, world);
            }
        }

        private void SetPlayerId(string id)
        {
            this.Context.Items["id"] = id;
        }

        private string GetPlayerId()
        {
            //return this.Context.ConnectionId;
            return this.Context.Items["id"].ToString();
        }

        private void PlayerLeave(string playerId)
        {
            world.Players.TryRemove(playerId, out Player player);
            if (player != null)
            {
                SendMessage($"{player.Name} left game");
                RefreshRanks();
                RefreshPlayers();
            }
        }

        public void PlayerMoveTo(Position position)
        {
            var playerId = GetPlayerId();
            world.Players.TryGetValue(playerId, out Player player);
            player.Position = position;
            Clients.Others.SendAsync(PlayerMoveToFunc, playerId, position);
            var peas = world.Peas.Values.ToArray();
            foreach (var pea in peas)
            {
                if (pea.Position.Equals(position))
                {
                    TryEatPea(playerId, pea.Id);
                }
            }
        }

        private void TryEatPea(string userId, string peaId)
        {
            if (!world.Players.TryGetValue(userId, out Player user))
            {
                return;
            }

            lock (SyncRoot)
            {
                if (!world.Peas.ContainsKey(peaId))
                {
                    // Other user eat this pea already
                    return;
                }

                user.Score++;
                world.Peas.TryRemove(peaId, out Pea pea);
                TryFillPeas();
                RefreshRanks();
            }
        }

        private void TryFillPeas()
        {
            if (world.Peas.Count >= world.Variables.MaxPea)
            {
                return;
            }

            lock (SyncRoot)
            {
                while (world.Peas.Count < world.Variables.MaxPea)
                {
                    var pea = new Pea(GetRandomPosition());
                    world.Peas[pea.Id] = pea;
                }

                if (Clients != null)
                {
                    Clients.All.SendAsync(UpdatePeasFunc, world.Peas.Values.ToList());
                }
            }
        }

        static Random r = new Random();

        private static Position GetRandomPosition()
        {
            return new Position()
            {
                X = r.Next(0, world.Variables.WorldWidth),
                Y = r.Next(0, world.Variables.WorldHeight)
            };
        }
    }
}
