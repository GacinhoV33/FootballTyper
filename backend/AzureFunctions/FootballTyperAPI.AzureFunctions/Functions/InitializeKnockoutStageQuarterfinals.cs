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
    public static class InitializeKnockoutStageQuarterfinals
    {
        [FunctionName("InitializeKnockoutStageQuarterfinals")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "InitializeKnockoutStageQuarterfinals")] HttpRequest req,
            [Sql("SELECT * FROM [dbo].[Teams]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Team> Teams,
            [Sql("SELECT * FROM [dbo].[Match] WHERE RoundNumber = 4 ORDER BY Id ASC",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> EightfinalMatches,
            [Sql("SELECT * FROM [dbo].[Match] WHERE RoundNumber = 5 ORDER BY Id ASC",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> QuarterfinalMatches,
            [Sql("[dbo].[Match]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] out MatchDbSave[] outMatches,
            ILogger log)
        {
            if (Teams.Any() && EightfinalMatches.Any())
            {
                UpdateData(EightfinalMatches, Teams);
                FillQuarterfinalMatches(EightfinalMatches, QuarterfinalMatches);

                outMatches = QuarterfinalMatches.Select(x => Mappers.MapMatchDbSave(x)).ToArray();
            }
            else
            {
                log.LogInformation("Cannot fill quarterfinal matches. Teams or Matches table is empty");
                outMatches = null;
            }
            return new OkObjectResult(new { Ok = true });
        }

        private static void FillQuarterfinalMatches(IEnumerable<Match> eightfinalMatches, IEnumerable<Match> quarterfinalMatches)
        {
            FillQuarterfinalMatch(eightfinalMatches, quarterfinalMatches, 57, 53, 54);
            FillQuarterfinalMatch(eightfinalMatches, quarterfinalMatches, 58, 49, 50);
            FillQuarterfinalMatch(eightfinalMatches, quarterfinalMatches, 59, 55, 56);
            FillQuarterfinalMatch(eightfinalMatches, quarterfinalMatches, 60, 51, 52);
        }

        private static void FillQuarterfinalMatch(IEnumerable<Match> eightfinalMatches, IEnumerable<Match> quarterfinalMatches,
            int quarterMatchNumber, int firstEightfinalMatchNumber, int secondEightfinalMatchNumber)
        {
            var match = quarterfinalMatches.Where(x => x.MatchNumber == quarterMatchNumber).First();
            match.HomeTeamId = GetWinner(eightfinalMatches, firstEightfinalMatchNumber);
            match.AwayTeamId = GetWinner(eightfinalMatches, secondEightfinalMatchNumber);
        }

        private static int? GetWinner(IEnumerable<Match> eightfinalMatches, int matchNumber)
        {
            var match = eightfinalMatches.Where(x => x.MatchNumber == matchNumber).First();
            return match.HomeTeamScore > match.AwayTeamScore ? match.HomeTeamId : match.AwayTeamId;
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
