using System.Collections.Generic;

namespace CommboxAgents.Models
{
    public class Agent
    {
        public int AgentID { get; set; }
        public string Name { get; set; }
        public List<AgentSkill> Skills { get; set; } = new List<AgentSkill>();
        public Location Location { get; set; }

    }
}
