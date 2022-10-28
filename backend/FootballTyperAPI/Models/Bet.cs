namespace FootballTyperAPI.Models
{
    public class Bet
    {
        public int Id { get; set; }

        public bool HomeTeamWin { get; set; }

        public int HomeTeamScoreBet { get; set; }

        public bool AwayTeamWin { get; set; }

        public int AwayTeamScoreBet { get; set; }

        public bool HomeAwayDrawn { get; set; }

        public float PointsFactor { get; set; } = 1;

        public int MatchId { get; set; }

        public Match Match { get; set; }

        public string BettorUserName { get; set; }

        public DateTime BetDate { get; set; }

        public ScoreEnum? BetResult { get; set; }
    }
}

