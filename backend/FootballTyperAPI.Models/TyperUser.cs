using System.Text.Json.Serialization;

namespace FootballTyperAPI.Models
{
    public class TyperUser
    {
        public int Id { get; set; }
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string Username { get; set; }

        [JsonIgnore]
        public string PasswordHash { get; set; }

        public int TotalPoints { get; set; }
        public int TotalExactScoreBets { get; set; }
        public int TotalCorrectWinnerBets { get; set; }
        public int TotalWrongBets { get; set; }
        public string? Leagues { get; set; }
        public string? ImgLink { get; set; }
        public string? LastFiveBets { get; set; }

    }
}
