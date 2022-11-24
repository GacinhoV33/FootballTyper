namespace FootballTyperAPI.Models
{
    public class TopScorerDb
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Group { get; set; }

        public int Goals { get; set; } = 0;
        public int Assists { get; set; } = 0;

        public int YellowCards { get; set; } = 0;
        public int RedCards { get; set; } = 0;
        public int YellowRedCards { get; set; } = 0;

        public string? Team { get; set; }
        public int? RapidApiId { get; set; }

    }
}
