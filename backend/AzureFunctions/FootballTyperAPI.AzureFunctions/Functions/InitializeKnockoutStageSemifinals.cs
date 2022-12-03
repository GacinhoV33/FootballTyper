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
    public static class InitializeKnockoutStageSemifinals
    {
        [FunctionName("InitializeKnockoutStageSemifinals")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "InitializeKnockoutStageSemifinals")] HttpRequest req,
            [Sql("SELECT * FROM [dbo].[Teams]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Team> Teams,
            [Sql("SELECT * FROM [dbo].[Match] WHERE RoundNumber = 6 ORDER BY Id ASC",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> SemifinalMatches,
            [Sql("SELECT * FROM [dbo].[Match] WHERE RoundNumber = 5 ORDER BY Id ASC",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> QuarterfinalMatches,
            [Sql("[dbo].[Match]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] out MatchDbSave[] outMatches,
            ILogger log)
        {
            if (Teams.Any() && QuarterfinalMatches.Any())
            {
                UpdateData(QuarterfinalMatches, Teams);
                FillSemifinalMatches(QuarterfinalMatches, SemifinalMatches);

                outMatches = SemifinalMatches.Select(x => Mappers.MapMatchDbSave(x)).ToArray();
            }
            else
            {
                log.LogInformation("Cannot fill semifinal matches. Teams or Matches table is empty");
                outMatches = null;
            }
            return new OkObjectResult(new { Ok = true });
        }

        private static void FillSemifinalMatches(IEnumerable<Match> quarterfinalMatches, IEnumerable<Match> semifinalMatches)
        {
            FillSemifinalMatch(semifinalMatches, quarterfinalMatches, 61, 58, 57);
            FillSemifinalMatch(semifinalMatches, quarterfinalMatches, 62, 60, 59);
        }

        private static void FillSemifinalMatch(IEnumerable<Match> semifinalMatches, IEnumerable<Match> quarterfinalMatches,
            int semifinalMatchNumber, int firstQuarterfinalMatchNumber, int secondQuarterfinalMatchNumber)
        {
            var match = semifinalMatches.Where(x => x.MatchNumber == semifinalMatchNumber).First();
            match.HomeTeamId = GetWinner(quarterfinalMatches, firstQuarterfinalMatchNumber);
            match.AwayTeamId = GetWinner(quarterfinalMatches, secondQuarterfinalMatchNumber);
        }

        private static int? GetWinner(IEnumerable<Match> quarterfinalMatches, int matchNumber)
        {
            var match = quarterfinalMatches.Where(x => x.MatchNumber == matchNumber).First();
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
