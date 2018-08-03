using System;

namespace Editor.Hubs.Model
{
    public class Player
    {
        private static int playerIndex = 0;
        public string Id { get; }
        public string Name { get; }
        public int Index { get; }
        public int Score { get; set; }
        public Position Position { get; set; }

        public Player(string id, string userName)
        {
            this.Id = id;
            this.Index = playerIndex++;
            this.Name = userName;
            this.Score = 0;
        }
    }
}
