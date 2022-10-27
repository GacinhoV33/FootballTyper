namespace FootballTyperAPI.Models.Bets
{
    public class PutBetRequest
    {
        public int Id { get; set; }

        public int HomeTeamScoreBet { get; set; }

        public int AwayTeamScoreBet { get; set; }

        public DateTime BetDate { get; set; }
    }
}
