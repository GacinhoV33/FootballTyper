namespace FootballTyperAPI.Models.Bets
{
    public class GetBetRequest
    {
        public int Id { get; set; }

        public int HomeTeamScoreBet { get; set; }

        public int AwayTeamScoreBet { get; set; }

        public int MatchId { get; set; }

        public Match Match { get; set; }

        public string BettorUserName { get; set; }

        public DateTime BetDate { get; set; }

        public bool? SuccessfulBet { get; set; }
    }
}
