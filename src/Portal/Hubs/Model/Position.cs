using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Editor.Hubs.Model
{
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
}
