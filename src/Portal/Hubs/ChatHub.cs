using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Editor.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }

    public class Position
    {
        public int X { get; set; }

        public int Y { get; set; }

        public override string ToString()
        {
            return $"X:{X}, Y:{Y}";
        }

        public override bool Equals(object obj)
        {
            var position = obj as Position;
            if (position == null)
            {
                return base.Equals(obj);
            }

            return this.X == position.X && this.Y == position.Y;
        }
    }

    public class User
    {
        public string Id { get; }
        public string Name { get; }
        public string Color { get; }
        public int Score { get; set; }

        public User(string userName, string color)
        {
            this.Id = Guid.NewGuid().ToString();
            this.Name = userName;
            this.Color = color;
        }
    }

    public class Pea
    {
        public string Id { get; }
        public Position Position { get; }

        public Pea(Position position)
        {
            this.Id = Guid.NewGuid().ToString();
            this.Position = position;
        }
    }

    public class Rank
    {
        public string Id { get; set; }
        public int Score { get; set; }
        public string UserName { get; set; }
        public string Color { get; set; }
    }

    public class Variables
    {
        public int MaxPea { get; } = 6;

        public int Step { get; } = 20;

        public int WorldWidth { get; } = 400;

        public int WorldHeight { get; } = 300;
    }

    public class WorldHub : Hub
    {
        private const string SystemMessageFunc = "SystemMessage";
        private const string UpdateRankFunc = "UpdateRank";
        private const string UpdatePeas = "UpdateRank";
        private const string StartGame = "StartGame";

        private Variables Variables = new Variables();
        public object SyncRoot = new object();
        public object RankSyncRoot = new object();

        public ConcurrentDictionary<string, Pea> Peas = new ConcurrentDictionary<string, Pea>();

        public ConcurrentDictionary<string, User> Users = new ConcurrentDictionary<string, User>();

        public List<Rank> Ranks = new List<Rank>();

        private void SendMessage(string message)
        {
            Clients.All.SendAsync(SystemMessageFunc, message);
        }

        private void RefreshRanks()
        {
            lock (RankSyncRoot)
            {
                var oldRanks = JsonConvert.SerializeObject(Ranks);
                this.Ranks = Users.Values.ToList()
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

        public User UserJoin(string userName, string color)
        {
            var user = new User(userName, color);
            Users[user.Id] = user;
            SendMessage($"{userName} joined game");
            RefreshRanks();
            return user;
        }

        public void Restart(string userId)
        {
            if (this.Users.TryGetValue(userId, out User user))
            {
                Clients.Caller.SendAsync(StartGame, user, GetRandomPosition(), this.Variables, this.Ranks);
            }
        }

        public void UserLeave(string userId)
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

                Clients.All.SendAsync(UpdatePeas, Peas.Values.ToList());
            }
        }

        Random r;

        private Position GetRandomPosition()
        {
            return new Position()
            {
                X = r.Next(0, this.Variables.WorldWidth),
                Y = r.Next(0, this.Variables.WorldHeight)
            };
        }

        public WorldHub()
            : base()
        {
            this.TryFillPeas();
        }
    }

    public class PeaHub : Hub
    {
        public async Task Eat(string userId, string peaId)
        {
            //await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }

}
