using FootballTyperAPI.Common;
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
    public static class UpdateScoreAfterMatch
    {
        [FunctionName("UpdateScoreAfterMatch")]
        public static IActionResult Run(
                [HttpTrigger(AuthorizationLevel.Function, "get", Route = "UpdateScoreAfterMatch")] HttpRequest req,
                [Sql("SELECT * FROM [dbo].[Match] WHERE HomeTeamId IS NOT NULL AND IsMatchProcessed != 1",
                    CommandType = System.Data.CommandType.Text,
                    ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> Matches,
                [Sql("SELECT * FROM [dbo].[Teams]",
                    CommandType = System.Data.CommandType.Text,
                    ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Team> Teams,
                [Sql("[dbo].[Teams]",
                    CommandType = System.Data.CommandType.Text,
                    ConnectionStringSetting = "SqlConnectionString")] out Team[] outTeams,
                [Sql("[dbo].[Match]",
                    CommandType = System.Data.CommandType.Text,
                    ConnectionStringSetting = "SqlConnectionString")] out MatchDbSave[] outMatches,
                ILogger log)
        {
            log.LogInformation($"-------------------------------------------------------------------------");
            log.LogInformation($"Execution date: {DateTime.Now}");
            log.LogInformation($"Starting execution of: UpdateScoreAfterMatch");
            bool hasDataChanged = false;

            UpdateData(Matches, Teams);
            var matchesToReturn = ScoreHelper.CalculatePointsForEachTeam(Matches, log, ref hasDataChanged);

            outTeams = Teams.ToArray();
            outMatches = Matches.Select(x => Mappers.MapMatchDbSave(x)).ToArray();

            log.LogInformation($"Ending execution of: UpdateScoreAfterMatch");
            log.LogInformation($"-------------------------------------------------------------------------");

            if (!hasDataChanged)
            {
                return new NotFoundObjectResult(new { Ok = true });
            }
            return new OkObjectResult(new { Ok = true});
        }

        public static void UpdateData(IEnumerable<Match> Matches, IEnumerable<Team> Teams)
        {
            foreach (var match in Matches)
            {
                match.HomeTeam = Teams.FirstOrDefault(x => x.Id == match.HomeTeamId);
                match.AwayTeam = Teams.FirstOrDefault(x => x.Id == match.AwayTeamId);
            }
        }

    }
}
