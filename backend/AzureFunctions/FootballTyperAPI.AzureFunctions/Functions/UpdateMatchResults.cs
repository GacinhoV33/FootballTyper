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
    public static class UpdateMatchResults
    {
        [FunctionName("UpdateMatchResults")]
        public static IActionResult Run(
                [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "UpdateMatchResults")] HttpRequest req,
                [Sql("SELECT * FROM [dbo].[Match] WHERE IsMatchProcessed != 1",
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
            log.LogInformation($"Starting execution of: UpdateMatchResults");
            bool hasDataChanged = false;

            UpdateData(Matches, Teams);

            var updatedMatches = MatchHelper.GetAllMatches(Teams.ToList()).Where(x => x.AwayTeamScore != -1 && x.HomeTeamScore != -1);
            foreach (var updatedMatch in updatedMatches)
            {
                var match = Matches.FirstOrDefault(x => x.AwayTeam.Name == updatedMatch.AwayTeam.Name
                    && x.HomeTeam.Name == updatedMatch.HomeTeam.Name
                    && x.MatchNumber == updatedMatch.MatchNumber
                );

                if (match != null)
                {
                    match.HomeTeamScore = updatedMatch.HomeTeamScore;
                    match.AwayTeamScore = updatedMatch.AwayTeamScore;
                    log.LogInformation($"ID of match played: {match.Id}. " +
                        $"Result: [{match.HomeTeam.Name}] {updatedMatch.HomeTeamScore} - {updatedMatch.AwayTeamScore} [{match.AwayTeam.Name}]");
                    hasDataChanged = true;
                }
            }

            var updatedKnockoutMatches = MatchHelper.GetAllMatches(Teams.ToList())
                .Where(x => x.RoundNumber == 4 && x.HomeTeam != null && x.AwayTeam != null);

            foreach (var updatedKnockoutMatch in updatedKnockoutMatches)
            {
                var knockoutMatch = Matches.FirstOrDefault(x => x.RoundNumber == 4
                && updatedKnockoutMatch.RoundNumber == 4
                && x.MatchNumber == updatedKnockoutMatch.MatchNumber
                && x.AwayTeamId == null
                && x.HomeTeamId == null
                );

                if (knockoutMatch != null)
                {
                    knockoutMatch.HomeTeamId = updatedKnockoutMatch.HomeTeam.Id;
                    knockoutMatch.AwayTeamId = updatedKnockoutMatch.AwayTeam.Id;
                    knockoutMatch.Location = updatedKnockoutMatch.Location;
                    log.LogInformation($"ID of knockout match setup: {knockoutMatch.Id}. " +
                        $"Result: [{knockoutMatch.HomeTeam.Name}] {updatedKnockoutMatch.HomeTeamScore}" +
                        $" - " +
                        $"{updatedKnockoutMatch.AwayTeamScore} [{knockoutMatch.AwayTeam.Name}]");
                    //hasDataChanged = true;
                }

                var knockoutMatchToUpdateScore = Matches.FirstOrDefault(x => x.RoundNumber == 4
                && updatedKnockoutMatch.RoundNumber == 4
                && x.MatchNumber == updatedKnockoutMatch.MatchNumber
                && x.AwayTeamId != null
                && x.HomeTeamId != null
                );

                if (knockoutMatchToUpdateScore != null && updatedKnockoutMatch.HomeTeamScore != -1 && updatedKnockoutMatch.AwayTeamScore != -1)
                {
                    knockoutMatchToUpdateScore.HomeTeamScore = updatedKnockoutMatch.HomeTeamScore;
                    knockoutMatchToUpdateScore.AwayTeamScore = updatedKnockoutMatch.AwayTeamScore;
                    knockoutMatchToUpdateScore.IsMatchProcessed = true;
                    knockoutMatchToUpdateScore.MatchProcessedDate = DateTime.Now;
                    log.LogInformation($"ID of knockout match played: {knockoutMatchToUpdateScore.Id}. " +
                        $"Result: [{knockoutMatchToUpdateScore.HomeTeam.Name}] {updatedKnockoutMatch.HomeTeamScore}" +
                        $" - " +
                        $"{updatedKnockoutMatch.AwayTeamScore} [{knockoutMatchToUpdateScore.AwayTeam.Name}]");
                    hasDataChanged = true;
                }
            }

            outTeams = Teams.ToArray();
            outMatches = Matches.Select(x => Mappers.MapMatchDbSave(x)).ToArray();

            log.LogInformation($"Ending execution of: UpdateMatchResults");
            log.LogInformation($"-------------------------------------------------------------------------");

            if (!hasDataChanged)
            {
                return new NotFoundObjectResult(new { Ok = true });
            }
            return new OkObjectResult(new { Ok = true });
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
