using System;

namespace Editor.Hubs.Model
{
    public class Player
    {
        public string Id { get; }
        public string Name { get; }
        public string Color { get; }
        public int Score { get; set; }
        public Position Position { get; set; }

        public Player(string id, string userName, string color, Position position)
        {
            this.Id = id;
            this.Name = userName;
            this.Color = color;
            this.Score = 0;
            this.Position = position;
        }
    }
}
