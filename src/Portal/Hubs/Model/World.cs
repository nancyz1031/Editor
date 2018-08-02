using System.Collections.Concurrent;
using System.Collections.Generic;

namespace Editor.Hubs.Model
{
    public class World
    {
        public Variables Variables { get; } = new Variables();
        public ConcurrentDictionary<string, Dot> Dots { get; } = new ConcurrentDictionary<string, Dot>();
        public ConcurrentDictionary<string, Player> Players { get; } = new ConcurrentDictionary<string, Player>();
        public List<Rank> Ranks { get; set; } = new List<Rank>();
    }
}
