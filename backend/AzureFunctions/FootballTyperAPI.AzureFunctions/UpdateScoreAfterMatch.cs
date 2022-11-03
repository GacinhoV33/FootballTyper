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
        // Visit https://aka.ms/sqlbindingsinput to learn how to use this input binding
        [FunctionName("UpdateScoreAfterMatch")]
        public static IActionResult Run(
                [HttpTrigger(AuthorizationLevel.Function, "get", Route = "UpdateScoreAfterMatch")] HttpRequest req,
                [Sql("SELECT * FROM [dbo].[Bets]",
            CommandType = System.Data.CommandType.Text,
            ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Bet> Bets,
                [Sql("SELECT * FROM [dbo].[Match]",
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

            UpdateData(Bets, Matches, Teams);
            CalculatePointsForEachTeam(Matches);

            outTeams = Teams.ToArray();
            outMatches = Matches.Select(x => MapMatch(x)).ToArray();

            log.LogInformation($"Ending execution of: UpdateScoreAfterMatch");
            log.LogInformation($"-------------------------------------------------------------------------");

            return new OkObjectResult(new { Ok = true });
        }

        private static void UpdateData(IEnumerable<Bet> Bets, IEnumerable<Match> Matches, IEnumerable<Team> Teams)
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

        private static void CalculatePointsForEachTeam(IEnumerable<Match> Matches)
        {
            foreach (var match in Matches)
            {
                if (match.HomeTeamScore != -1 && match.AwayTeamScore != -1 && !match.IsMatchProcessed)
                    CalculateResultPointsForTeamByMatch(match);
            }
        }

        private static void CalculateResultPointsForTeamByMatch(Match match)
        {
            if (match.HomeTeamScore == match.AwayTeamScore)
            {
                match.AwayTeam.Points += (int)MatchResult.Drawn;
                match.AwayTeam.Drawn += 1;

                match.HomeTeam.Points += (int)MatchResult.Drawn;
                match.HomeTeam.Drawn += 1;
            }

            else if (match.HomeTeamScore > match.AwayTeamScore)
            {
                match.HomeTeam.Points += (int)MatchResult.Won;
                match.HomeTeam.Won += 1;

                match.AwayTeam.Points += (int)MatchResult.Lost;
                match.AwayTeam.Lost += 1;
            }
            else
            {
                match.HomeTeam.Points += (int)MatchResult.Lost;
                match.HomeTeam.Lost += 1;

                match.AwayTeam.Points += (int)MatchResult.Won;
                match.AwayTeam.Won += 1;
            }

            match.HomeTeam.PlayedMatchesNbr += 1;
            match.AwayTeam.PlayedMatchesNbr += 1;


            match.AwayTeam.GoalsFor += match.AwayTeamScore;
            match.AwayTeam.GoalsAgainst += match.HomeTeamScore;
            match.HomeTeam.GoalsFor += match.HomeTeamScore;
            match.HomeTeam.GoalsAgainst += match.AwayTeamScore;
            match.IsMatchProcessed = true;
        }

        private static MatchDbSave MapMatch(Match match)
        {
            return new MatchDbSave()
            {
                Id = match.Id,
                HomeTeamId = match.HomeTeamId,
                AwayTeamId = match.AwayTeamId,
                HomeTeamScore = match.HomeTeamScore,
                AwayTeamScore = match.AwayTeamScore,
                Group = match.Group,
                Location = match.Location,
                Date = match.Date,
                MatchNumber = match.MatchNumber,
                RoundNumber = match.RoundNumber,
                IsMatchProcessed = match.IsMatchProcessed,
                Referee = match.Referee,
                Town = match.Town
            };
        }
    }
}
