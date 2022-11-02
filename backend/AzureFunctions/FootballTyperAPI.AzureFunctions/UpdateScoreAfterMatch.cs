using FootballTyperAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace FootballTyperAPI.AzureFunctions
{
    public static class UpdateScoreAfterMatch
    {
        // Visit https://aka.ms/sqlbindingsinput to learn how to use this input binding
        [FunctionName("UpdateScoreAfterMatch")]
        public static IActionResult Run(
                [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
                [Sql("SELECT * FROM [dbo].[Bets]",
            CommandType = System.Data.CommandType.Text,
            ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Bet> Bets,
                [Sql("SELECT * FROM [dbo].[Match]",
            CommandType = System.Data.CommandType.Text,
            ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> Matches,
                [Sql("SELECT * FROM [dbo].[Teams]",
            CommandType = System.Data.CommandType.Text,
            ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Team> Teams,
                ILogger log)
        {
            log.LogInformation("C# HTTP trigger with SQL Input Binding function processed a request.");
            UpdateBetData(Bets, Matches, Teams);

            return new OkObjectResult(new { Ok = true });
        }

        private static void UpdateBetData(IEnumerable<Bet> Bets, IEnumerable<Match> Matches, IEnumerable<Team> Teams)
        {
            foreach (var bet in Bets)
            {
                bet.Match = Matches.FirstOrDefault(x => x.Id == bet.MatchId);
            }

            foreach (var match in Matches)
            {
                match.HomeTeam = Teams.FirstOrDefault(x => x.Id == match.HomeTeamId);
                match.AwayTeam = Teams.FirstOrDefault(x => x.Id == match.AwayTeamId);
            }
        }
    }
}
