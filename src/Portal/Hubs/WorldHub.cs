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
        private const string UpdateRankFunc = "UpdateRank";
        private const string UpdatePeas = "UpdatePeas";
        private const string StartGame = "StartGame";

        private static Variables Variables = new Variables();
        public static object SyncRoot = new object();
        public static object RankSyncRoot = new object();

        public static ConcurrentDictionary<string, Pea> Peas = new ConcurrentDictionary<string, Pea>();

        public static ConcurrentDictionary<string, User> Users = new ConcurrentDictionary<string, User>();

        public static List<Rank> Ranks = new List<Rank>();

        private void SendMessage(string message)
        {
            Clients.All.SendAsync(SystemMessageFunc, message);
        }

        private void RefreshRanks()
        {
            lock (RankSyncRoot)
            {
                var oldRanks = JsonConvert.SerializeObject(Ranks);
                Ranks = Users.Values.ToList()
                    .Select(user => new Rank() { Id = user.Id, UserName = user.Name, Color = user.Color, Score = user.Score })
                    .OrderBy(rank => rank.Score)
                    .ToList();
                var newRanks = JsonConvert.SerializeObject(Ranks);

                if (oldRanks != newRanks)
                {
                    Clients.All.SendAsync(UpdateRankFunc, Ranks);
                }
            }
        }

        public override Task OnConnectedAsync()
        {
            var task = base.OnConnectedAsync();
            return task;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            this.UserLeave(this.Context.ConnectionId);
            return base.OnDisconnectedAsync(exception);
        }

        public void UserJoin(string userName, string color)
        {
            var user = new User(this.Context.ConnectionId, userName, color, GetRandomPosition());
            Users[user.Id] = user;
            TryFillPeas();
            RefreshRanks();
            Restart();
        }

        public void Restart()
        {
            if (Users.TryGetValue(this.Context.ConnectionId, out User user))
            {
                user.Score = 0;
                user.Position = GetRandomPosition();
                SendMessage($"{user.Name} joined game");
                Clients.Caller.SendAsync(StartGame, user, Variables, Ranks);
            }
        }

        private void UserLeave(string userId)
        {
            Users.TryRemove(userId, out User user);
            if (user != null)
            {
                SendMessage($"{user.Name} left game");
                RefreshRanks();
            }
        }

        public void UserMoveTo(string userId, Position position)
        {
            var peas = Peas.Values.ToArray();
            foreach (var pea in peas)
            {
                if (pea.Position == position)
                {
                    TryEatPea(userId, pea.Id);
                }
            }
        }

        private void TryEatPea(string userId, string peaId)
        {
            if (!Users.TryGetValue(userId, out User user))
            {
                return;
            }

            lock (SyncRoot)
            {
                if (!Peas.ContainsKey(peaId))
                {
                    // Other user eat this pea already
                    return;
                }

                user.Score++;
                Peas.TryRemove(peaId, out Pea pea);
                TryFillPeas();
            }
        }

        private void TryFillPeas()
        {
            if (Peas.Count >= Variables.MaxPea)
            {
                return;
            }

            lock (SyncRoot)
            {
                while (Peas.Count < Variables.MaxPea)
                {
                    var pea = new Pea(GetRandomPosition());
                    Peas[pea.Id] = pea;
                }

                if (Clients != null)
                {
                    Clients.All.SendAsync(UpdatePeas, Peas.Values.ToList());
                }
            }
        }

        static Random r = new Random();

        private static Position GetRandomPosition()
        {
            return new Position()
            {
                X = r.Next(0, Variables.WorldWidth),
                Y = r.Next(0, Variables.WorldHeight)
            };
        }
    }
}
