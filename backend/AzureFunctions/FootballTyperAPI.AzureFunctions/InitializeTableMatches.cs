using FootballTyperAPI.AzureFunctions;
using FootballTyperAPI.Helpers;
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
    public static class InitializeTableMatches
    {
        [FunctionName("InitializeTableMatches")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "InitializeTableMatches")] HttpRequest req,
            [Sql("SELECT * FROM [dbo].[Teams]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Team> Teams,
            [Sql("[dbo].[Match]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] out MatchDbSave[] outMatches,
            ILogger log)
        {
            if (Teams.Any())
            {
                var matches = MatchHelper.GetAllMatches(Teams.ToList());
                foreach (var match in matches.Where(x => x.AwayTeam != null))
                {
                    match.HomeTeamId = match.HomeTeam.Id;
                    match.AwayTeamId = match.AwayTeam.Id;
                }
                outMatches = matches.Select(x => UpdateScoreAfterMatch.MapMatch(x)).ToArray();
            }
            else
            {
                log.LogInformation("Cannot fill Matches table. Teams table is empty");
                outMatches = null;
            }

            return new OkObjectResult(new { Ok = true });
        }
    }
}
