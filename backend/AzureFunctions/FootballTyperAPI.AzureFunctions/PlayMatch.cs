using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FootballTyperAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace FootballTyperAPI.AzureFunctions
{
    public static class PlayMatch
    {
        [FunctionName("PlayMatch")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
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
            log.LogInformation($"Starting execution of: PlayMatch");

            var match = Matches.ElementAt(Random.Shared.Next(0, Matches.Count()));
            match.AwayTeamScore = Random.Shared.Next(0, 7);
            match.HomeTeamScore = Random.Shared.Next(0, 7);
            match.Date = DateTime.Now;
            outMatches = Matches.ToArray();

            log.LogInformation($"Ending execution of: PlayMatch");
            log.LogInformation($"-------------------------------------------------------------------------");

            return new OkObjectResult(new { Ok = true, Match = match });
        }
    }
}
