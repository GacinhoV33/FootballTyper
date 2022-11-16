﻿using FootballTyperAPI.Models;
using System.Net;
using System.Text.Json;

namespace FootballTyperAPI.Common
{
    public static class TeamHelper
    {
        private static string URL = "https://fixturedownload.com/feed/json/fifa-world-cup-2022";

        public static List<Team> GetAllTeams()
        {
            var jsonString = new WebClient().DownloadString(URL);
            var allMatches = JsonSerializer.Deserialize<List<MatchJSON>>(jsonString);
            return allMatches.Select(t => t.HomeTeam).Concat(allMatches.Select(d => d.AwayTeam)).Distinct().Select(x => new Team() { Name = x }).ToList();
        }

        public static List<Team> GetAllValidTeams()
        {
            var jsonString = new WebClient().DownloadString(URL);
            var allMatches = JsonSerializer.Deserialize<List<MatchJSON>>(jsonString).Where(p => p.Location != "TBA");
            return allMatches.Select(t => t.HomeTeam).Concat(allMatches.Select(d => d.AwayTeam)).Distinct()
                .Select(x => new Team() { Name = x, Group = allMatches.FirstOrDefault(y => y.HomeTeam == x || y.AwayTeam == x)?.Group.Replace("Group ", "") }).ToList();
        }

    }
}