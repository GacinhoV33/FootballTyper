namespace FootballTyperAPI.Models.Api
{
    public class MatchApi
    {
        public string? HomeTeam { get; set; }

        public string? AwayTeam { get; set; }

        public int HomeTeamScore { get; set; }

        public int AwayTeamScore { get; set; }

        public string? Group { get; set; }

        public string? Stadium { get; set; }

        public DateTime Date { get; set; }

        public string? Referee { get; set; }
    }
}
