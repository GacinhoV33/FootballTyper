using System.ComponentModel;

namespace FootballTyperAPI.Models
{
    public class MatchDbSave
    {
        public int Id { get; set; }

        public int? HomeTeamId { get; set; }

        public int? AwayTeamId { get; set; }

        [DisplayName("Score")]
        public int HomeTeamScore { get; set; }

        [DisplayName("Score")]
        public int AwayTeamScore { get; set; }

        public string? Group { get; set; }

        [DisplayName("Stadium")]
        public string Location { get; set; }

        public DateTime Date { get; set; }

        //public List<Card> Cards { get; set; }
        public string? Referee { get; set; }

        public string? Town { get; set; }

        public int MatchNumber { get; set; }

        public int RoundNumber { get; set; }

        public bool IsMatchProcessed { get; set; }

        public DateTime MatchProcessedDate { get; set; }

        public Stage? Stage { get; set; }
    }
}
