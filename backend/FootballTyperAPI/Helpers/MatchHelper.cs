using FootballTyperAPI.Models;
using System.Globalization;
using System.Net;
using System.Text.Json;

namespace FootballTyperAPI.Helpers
{
    public static class MatchHelper
    {
        public static string URL = "https://fixturedownload.com/feed/json/fifa-world-cup-2022";
        public static List<Match> GetAllMatches(List<Team> allTeams)
        {
            var jsonString = new WebClient().DownloadString(URL);
            var allMatches = JsonSerializer.Deserialize<List<MatchJSON>>(jsonString);
            //var allTeams = allMatches.Select(t => t.HomeTeam).Concat(allMatches.Select(d => d.AwayTeam)).Distinct().Select(x => new Team() { Name = x }).ToList();
            return allMatches.Select(t => MapMatch(t, allTeams)).ToList();
        }

        public static List<MatchJSON> GetAllMatchesJSON()
        {
            var jsonString = new WebClient().DownloadString(URL);
            var allMatches = JsonSerializer.Deserialize<List<MatchJSON>>(jsonString);
            return allMatches;
        }

        private static Match MapMatch(MatchJSON matchJson, List<Team> allTeams)
        {
            return new Match()
            {
                HomeTeam = allTeams.FirstOrDefault(t => t.Name == matchJson.HomeTeam),
                AwayTeam = allTeams.FirstOrDefault(t => t.Name == matchJson.AwayTeam),
                HomeTeamScore = matchJson.HomeTeamScore == null ? -1 : int.Parse(matchJson.HomeTeamScore),
                AwayTeamScore = matchJson.AwayTeamScore == null ? -1 : int.Parse(matchJson.AwayTeamScore),
                //HomeTeamScore = matchJson.HomeTeamScore == null ? new Random().Next(0, 10) : int.Parse(matchJson.HomeTeamScore),
                //AwayTeamScore = matchJson.AwayTeamScore == null ? new Random().Next(0, 10) : int.Parse(matchJson.AwayTeamScore),
                Group = matchJson.Group,
                Location = matchJson.Location,
                Date = DateTime.ParseExact(matchJson.DateUtc, "yyyy-MM-dd HH:mm:ssZ", CultureInfo.InvariantCulture),
                MatchNumber = matchJson.MatchNumber,
                RoundNumber = matchJson.RoundNumber
            };
        }

    }
}
