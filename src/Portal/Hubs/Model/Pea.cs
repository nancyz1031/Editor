using System;

namespace Editor.Hubs.Model
{
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
}
