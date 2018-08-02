using System;

namespace Editor.Hubs.Model
{
    public class Dot
    {
        public string Id { get; }
        public Position Position { get; }

        public Dot(Position position)
        {
            this.Id = Guid.NewGuid().ToString();
            this.Position = position;
        }

        public override string ToString()
        {
            return Position.ToString();
        }
    }
}
