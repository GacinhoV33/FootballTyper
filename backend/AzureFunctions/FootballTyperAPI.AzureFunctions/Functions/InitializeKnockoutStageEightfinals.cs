using FootballTyperAPI.AzureFunctions;
using FootballTyperAPI.Common;
using FootballTyperAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace Company.Function
{
    public static class InitializeKnockoutStageEightfinals
    {
        private class TeamAndPosition
        {
            public Team Team { get; set; }
            public int Position { get; set; }
        }

        [FunctionName("InitializeKnockoutStageEightfinals")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "InitializeKnockoutStageEightfinals")] HttpRequest req,
            [Sql("SELECT * FROM [dbo].[Teams]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Team> Teams,
            [Sql("SELECT * FROM [dbo].[Match] WHERE RoundNumber <= 3",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> GroupMatches,
            [Sql("SELECT * FROM [dbo].[Match] WHERE RoundNumber = 4 ORDER BY Id ASC",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> KnockoutMatches,
            [Sql("[dbo].[Match]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] out MatchDbSave[] outMatches,
            ILogger log)
        {
            if (Teams.Any() && GroupMatches.Any() && KnockoutMatches.Any())
            {
                UpdateData(GroupMatches, Teams);
                Dictionary<string, List<TeamAndPosition>> teamAndPositionDict = CreateTeamAndPositionDict(Teams);
                FillEightfinalMatches(KnockoutMatches, teamAndPositionDict);

                outMatches = KnockoutMatches.Select(x => Mappers.MapMatchDbSave(x)).ToArray();
            }
            else
            {
                log.LogInformation("Cannot fill eightfinal matches. Teams or Matches table is empty");
                outMatches = null;
            }

            return new OkObjectResult(new { Ok = true });
        }

        private static void FillEightfinalMatches(IEnumerable<Match> KnockoutMatches, Dictionary<string, List<TeamAndPosition>> teamAndPositionDict)
        {
            int it = 0;
            FillEightfinalMatch(teamAndPositionDict, KnockoutMatches, it++, "A", 1, "B", 2);
            FillEightfinalMatch(teamAndPositionDict, KnockoutMatches, it++, "C", 1, "D", 2);
            FillEightfinalMatch(teamAndPositionDict, KnockoutMatches, it++, "E", 1, "F", 2);
            FillEightfinalMatch(teamAndPositionDict, KnockoutMatches, it++, "G", 1, "H", 2);

            FillEightfinalMatch(teamAndPositionDict, KnockoutMatches, it++, "B", 1, "A", 2);
            FillEightfinalMatch(teamAndPositionDict, KnockoutMatches, it++, "D", 1, "C", 2);
            FillEightfinalMatch(teamAndPositionDict, KnockoutMatches, it++, "F", 1, "E", 2);
            FillEightfinalMatch(teamAndPositionDict, KnockoutMatches, it++, "H", 1, "G", 2);
        }

        private static Dictionary<string, List<TeamAndPosition>> CreateTeamAndPositionDict(IEnumerable<Team> Teams)
        {
            Dictionary<string, List<TeamAndPosition>> teamAndPositionDict = new();
            foreach (var group in Teams.Select(x => x.Group).Distinct().OrderBy(y => y))
            {
                var twoBestTeams = Teams.Where(x => x.Group == group)
                    .OrderByDescending(y => y.Points)
                    .ThenByDescending(y => y.GoalsFor - y.GoalsAgainst)
                    .ThenByDescending(y => y.GoalsFor) //TO DO. NEXT RULES
                    .Take(2);

                teamAndPositionDict.Add(group, new List<TeamAndPosition>
                    {
                        new TeamAndPosition { Team = twoBestTeams.First(), Position = 1 },
                        new TeamAndPosition { Team = twoBestTeams.Skip(1).First(), Position = 2 }
                    });
            }
            return teamAndPositionDict;
        }

        private static void FillEightfinalMatch(Dictionary<string, List<TeamAndPosition>> teamAndPositionDict,
            IEnumerable<Match> knockoutMatches, int it, string firstGroup, int firstPosition, string secondGroup, int secondPosition)
        {
            var match = knockoutMatches.Skip(it).First();
            match.HomeTeamId = teamAndPositionDict[firstGroup].Where(x => x.Position == firstPosition).Select(y => y.Team.Id).First();
            match.AwayTeamId = teamAndPositionDict[secondGroup].Where(x => x.Position == secondPosition).Select(y => y.Team.Id).First();
        }

        private static void UpdateData(IEnumerable<Match> Matches, IEnumerable<Team> Teams)
        {
            foreach (var match in Matches)
            {
                match.HomeTeam = Teams.FirstOrDefault(x => x.Id == match.HomeTeamId);
                match.AwayTeam = Teams.FirstOrDefault(x => x.Id == match.AwayTeamId);
            }
        }
    }
}
