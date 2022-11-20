using System;
using System.Collections.Generic;
using System.Text;

namespace FootballTyperAPI.Models
{
    public class MatchJSON
    {
        public int MatchNumber { get; set; }
        public int RoundNumber { get; set; }
        public string DateUtc { get; set; }
        public DateTime Date { get; set; }
        public string Location { get; set; }
        public string HomeTeam { get; set; }
        public string AwayTeam { get; set; }
        public string Group { get; set; }
        public int? HomeTeamScore { get; set; }
        public int? AwayTeamScore { get; set; }
    }
}
