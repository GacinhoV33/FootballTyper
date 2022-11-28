namespace FootballTyperAPI.Models
{
    public class BetExcelData
    {
        public int BetId { get; set; }
        public string? MatchDate { get; set; }
        public string? Group { get; set; }
        public int MatchNumber { get; set; }
        public int Stage { get; set; }
        public string? HomeTeamName { get; set; }
        public int HomeTeamScore { get; set; }
        public int HomeTeamScoreBet { get; set; }
        public string? AwayTeamName { get; set; }
        public int AwayTeamScore { get; set; }
        public int AwayTeamScoreBet { get; set; }
        public int MatchId { get; set; }
        public string? FullName { get; set; }
        public string? BetDate { get; set; }
        public int BetResult { get; set; }
    }
}
