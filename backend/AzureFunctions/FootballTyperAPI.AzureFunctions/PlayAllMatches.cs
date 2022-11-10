using FootballTyperAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FootballTyperAPI.AzureFunctions
{
    public static class PlayAllMatches
    {
        [FunctionName("PlayAllMatches")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "PlayAllMatches")] HttpRequest req,
            [Sql("SELECT * FROM [dbo].[Match] WHERE HomeTeamId IS NOT NULL",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<MatchDbSave> Matches,
            [Sql("[dbo].[Match]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] out MatchDbSave[] outMatches,
            ILogger log)
        {
            log.LogInformation($"-------------------------------------------------------------------------");
            log.LogInformation($"Execution date: {DateTime.Now}");
            log.LogInformation($"Starting execution of: PlayAllMatches");

            if (Matches.Count() > 0)
            {
                foreach (var match in Matches)
                {
                    match.AwayTeamScore = Random.Shared.Next(0, 3);
                    match.HomeTeamScore = Random.Shared.Next(0, 3);
                    match.Date = DateTime.Now;
                    log.LogInformation($"ID of match played: {match.Id}. Result: [{match.AwayTeamId}] {match.AwayTeamScore} - {match.HomeTeamScore} [{match.HomeTeamId}]");
                }
            }
            else
            {
                log.LogInformation("No matches in Database");
            }

            outMatches = Matches.ToArray();
            log.LogInformation($"Ending execution of: PlayAllMatches");
            log.LogInformation($"-------------------------------------------------------------------------");
            return new OkObjectResult(new { Ok = true });
        }
    }
}
