namespace FootballTyperAPI.Models
{
    public class Ranking
    {
        public TyperUser User { get; set; }
        public Dictionary<string, int> LeaguePosition { get; set; } = new Dictionary<string, int>();

    }
}
