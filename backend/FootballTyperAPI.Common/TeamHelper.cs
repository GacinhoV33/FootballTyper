using FootballTyperAPI.Models;
using System.Net;
using System.Text.Json;

namespace FootballTyperAPI.Common
{
    public static class TeamHelper
    {
        private static string URL = "https://fixturedownload.com/feed/json/fifa-world-cup-2022";

        public static List<Team> GetAllTeams()
        {
            try
            {
                var jsonString = new WebClient().DownloadString(URL);
                var allMatches = JsonSerializer.Deserialize<List<MatchJSON>>(jsonString);
                return allMatches.Select(t => t.HomeTeam).Concat(allMatches.Select(d => d.AwayTeam)).Distinct().Select(x => new Team() { Name = x }).ToList();
            }
            catch (Exception ex)
            {
                var nex = ex;
            }
            return new List<Team>();
        }

        public static List<Team> GetAllValidTeams()
        {
            try
            {
                var jsonString = new WebClient().DownloadString(URL);
                var allMatches = JsonSerializer.Deserialize<List<MatchJSON>>(jsonString);
                allMatches = allMatches.Where(p => p.Location != "TBA"
                    && p.AwayTeam.Length > 2 && p.HomeTeam.Length > 2
                    && p.AwayTeam != "To be announced" && p.HomeTeam != "To be announced")
                    .ToList();
                return allMatches.Select(t => t.HomeTeam).Concat(allMatches.Select(d => d.AwayTeam)).Distinct()
                    .Select(x => new Team() { Name = x, Group = allMatches.FirstOrDefault(y => y.HomeTeam == x || y.AwayTeam == x)?.Group.Replace("Group ", "") }).ToList();

            }
            catch (Exception ex)
            {
                var nex = ex;
            }
            return new List<Team>();
        }
    }
}

