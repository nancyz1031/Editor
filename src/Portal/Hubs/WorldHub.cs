using Editor.Hubs.Model;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Editor.Hubs
{
    public class WorldHub : Hub
    {
        private const string SystemMessageFunc = "SystemMessage";
        private const string UpdateRanksFunc = "UpdateRanks";
        private const string UpdateDotsFunc = "UpdateDots";
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
                    .Select(user => new Rank() { Id = user.Id, UserName = user.Name, ColorIndex = user.Index, Score = user.Score })
                    .OrderByDescending(rank => rank.Score)
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

        public void PlayerJoin(string userName)
        {
            var id = Guid.NewGuid().ToString();
            SetPlayerId(id);
            var user = new Player(id, userName);
            world.Players[user.Id] = user;
            Start();
            TryFillDots();
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
            var id = this.Context.Items["id"];
            return id?.ToString();
        }

        private void PlayerLeave(string playerId)
        {
            if (playerId == null)
            {
                // Haven't login
                return;
            }

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
            var dots = world.Dots.Values.ToArray();
            foreach (var dot in dots)
            {
                if (dot.Position.Equals(position))
                {
                    TryEatDot(playerId, dot.Id);
                }
            }
        }

        private void TryEatDot(string userId, string dotId)
        {
            if (!world.Players.TryGetValue(userId, out Player user))
            {
                return;
            }

            lock (SyncRoot)
            {
                if (!world.Dots.ContainsKey(dotId))
                {
                    // Other user eat this dot already
                    return;
                }

                user.Score++;
                world.Dots.TryRemove(dotId, out Dot dot);
                TryFillDots();
                RefreshRanks();
            }
        }

        private void TryFillDots()
        {
            if (world.Dots.Count >= world.Variables.MaxDot)
            {
                return;
            }

            lock (SyncRoot)
            {
                while (world.Dots.Count < world.Variables.MaxDot)
                {
                    var dot = new Dot(GetRandomPosition());
                    world.Dots[dot.Id] = dot;
                }

                if (Clients != null)
                {
                    Clients.All.SendAsync(UpdateDotsFunc, world.Dots.Values.ToList());
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
