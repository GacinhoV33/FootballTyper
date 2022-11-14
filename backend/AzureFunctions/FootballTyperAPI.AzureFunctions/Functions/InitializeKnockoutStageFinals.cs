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
    public static class InitializeKnockoutStageFinals
    {
        [FunctionName("InitializeKnockoutStageFinals")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "InitializeKnockoutStageFinals")] HttpRequest req,
            [Sql("SELECT * FROM [dbo].[Teams]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Team> Teams,
            [Sql("SELECT * FROM [dbo].[Match] WHERE RoundNumber = 7 ORDER BY Id ASC",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> FinalMatches,
            [Sql("SELECT * FROM [dbo].[Match] WHERE RoundNumber = 6 ORDER BY Id ASC",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> SemifinalMatches,
            [Sql("[dbo].[Match]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] out MatchDbSave[] outMatches,
            ILogger log)
        {
            if (Teams.Any() && SemifinalMatches.Any())
            {
                UpdateData(SemifinalMatches, Teams);
                FillFinalMatches(SemifinalMatches, FinalMatches);

                outMatches = FinalMatches.Select(x => Mappers.MapMatchDbSave(x)).ToArray();
            }
            else
            {
                log.LogInformation("Cannot fill final matches. Teams or Matches table is empty");
                outMatches = null;
            }
            return new OkObjectResult(new { Ok = true });
        }

        private static void FillFinalMatches(IEnumerable<Match> semifinalMatches, IEnumerable<Match> finalMatches)
        {
            FillThirdPlaceMatch(finalMatches, semifinalMatches, 63, 61, 62);
            FillFinalMatch(finalMatches, semifinalMatches, 64, 61, 62);
        }

        private static void FillFinalMatch(IEnumerable<Match> finalMatches, IEnumerable<Match> semifinalMatches,
            int finalMatchNumber, int firstSemifinalMatchNumber, int secondSemifinalMatchNumber)
        {
            var match = finalMatches.Where(x => x.MatchNumber == finalMatchNumber).First();
            match.HomeTeamId = GetWinner(semifinalMatches, firstSemifinalMatchNumber);
            match.AwayTeamId = GetWinner(semifinalMatches, secondSemifinalMatchNumber);
        }

        private static void FillThirdPlaceMatch(IEnumerable<Match> finalMatches, IEnumerable<Match> semifinalMatches,
            int thirdPlaceMatchNumber, int firstSemifinalMatchNumber, int secondSemifinalMatchNumber)
        {
            var match = finalMatches.Where(x => x.MatchNumber == thirdPlaceMatchNumber).First();
            match.HomeTeamId = GetLooser(semifinalMatches, firstSemifinalMatchNumber);
            match.AwayTeamId = GetLooser(semifinalMatches, secondSemifinalMatchNumber);
        }

        private static int? GetWinner(IEnumerable<Match> semiFinalMatches, int matchNumber)
        {
            var match = semiFinalMatches.Where(x => x.MatchNumber == matchNumber).First();
            return match.HomeTeamScore > match.AwayTeamScore ? match.HomeTeamId : match.AwayTeamId;
        }

        private static int? GetLooser(IEnumerable<Match> semiFinalMatches, int matchNumber)
        {
            var match = semiFinalMatches.Where(x => x.MatchNumber == matchNumber).First();
            return match.HomeTeamScore < match.AwayTeamScore ? match.HomeTeamId : match.AwayTeamId;
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
