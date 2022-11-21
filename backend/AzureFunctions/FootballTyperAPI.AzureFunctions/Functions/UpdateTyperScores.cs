using FootballTyperAPI.Common;
using FootballTyperAPI.Helpers;
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
    public static class UpdateTyperScores
    {

        [FunctionName("UpdateTyperScores")]
        public static IActionResult Run(
                [HttpTrigger(AuthorizationLevel.Function, "get", Route = "UpdateTyperScores")] HttpRequest req,
                [Sql("SELECT * FROM [dbo].[Bets]",
                    CommandType = System.Data.CommandType.Text,
                    ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Bet> Bets,
                [Sql("SELECT * FROM [dbo].[Match] WHERE HomeTeamId IS NOT NULL",
                    CommandType = System.Data.CommandType.Text,
                    ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> Matches,
                [Sql("SELECT * FROM [dbo].[TyperUser]",
                    CommandType = System.Data.CommandType.Text,
                    ConnectionStringSetting = "SqlConnectionString")] IEnumerable<TyperUser> Users,
                [Sql("[dbo].[Bets]",
                    CommandType = System.Data.CommandType.Text,
                    ConnectionStringSetting = "SqlConnectionString")] out BetDbSave[] outBets,
                [Sql("[dbo].[TyperUser]",
                    CommandType = System.Data.CommandType.Text,
                    ConnectionStringSetting = "SqlConnectionString")] out TyperUser[] outUsers,
                ILogger log)
        {
            log.LogInformation($"-------------------------------------------------------------------------");
            log.LogInformation($"Execution date: {DateTime.Now}");
            log.LogInformation($"Starting execution of: UpdateTyperScores");

            var prevRanking = RankingHelper.CreateRanking(Users.Where(x => x.LeaguesStr != null), 1);
            RankingHelper.UpdateRankStatus(Users.Where(x => x.LeaguesStr != null), prevRanking, prevRanking);

            UpdateData(Bets, Matches);
            var betsToReturn = ScoreHelper.CalculatePointsForEachUser(Bets, Users, log);
            ScoreHelper.UpdateLastFiveUserBets(Bets, Users);

            var updatedRanking = RankingHelper.CreateRanking(Users.Where(x => x.LeaguesStr != null), 1);
            RankingHelper.UpdateRankStatus(Users.Where(x => x.LeaguesStr != null), prevRanking, updatedRanking);

            outUsers = Users.ToArray();
            outBets = Bets.Select(x => Mappers.MapBet(x)).ToArray();

            log.LogInformation($"Ending execution of: UpdateTyperScores");
            log.LogInformation($"-------------------------------------------------------------------------");

            return new OkObjectResult(new { Ok = true});
        }


        public static void UpdateData(IEnumerable<Bet> Bets, IEnumerable<Match> Matches)
        {
            foreach (var bet in Bets)
            {
                bet.Match = Matches.FirstOrDefault(x => x.Id == bet.MatchId);
            }
        }
    }
}
