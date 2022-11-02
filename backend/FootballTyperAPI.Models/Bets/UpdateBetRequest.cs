namespace FootballTyperAPI.Models.Bets
{
    public class PostBetRequest
    {
        public int HomeTeamScoreBet { get; set; }

        public int AwayTeamScoreBet { get; set; }

        public int MatchId { get; set; }

        public string BettorUserName { get; set; }

        public DateTime BetDate { get; set; }
    }
}
