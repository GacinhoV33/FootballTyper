namespace FootballTyperAPI.Models
{
    public class TopScorerDb
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Group { get; set; }

        public int Goals { get; set; }
        public int Assists { get; set; }

        public int YellowCards { get; set; }
        public int RedCards { get; set; }

    }
}
