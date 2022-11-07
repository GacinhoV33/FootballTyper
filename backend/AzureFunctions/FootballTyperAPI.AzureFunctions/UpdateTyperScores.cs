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
                //    [Sql("[dbo].[Teams]",
                //CommandType = System.Data.CommandType.Text,
                //ConnectionStringSetting = "SqlConnectionString")] out Team[] outTeams,
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

            UpdateData(Bets, Matches);  //, Teams);
            var betsToReturn = CalculatePointsForEachUser(Bets, Users, log);

            outUsers = Users.ToArray();
            outBets = Bets.Select(x => MapBet(x)).ToArray();


            log.LogInformation($"Ending execution of: UpdateTyperScores");
            log.LogInformation($"-------------------------------------------------------------------------");

            return new OkObjectResult(new { Ok = true, Bets = betsToReturn });
        }

        public static void UpdateData(IEnumerable<Bet> Bets, IEnumerable<Match> Matches)//, IEnumerable<Team> Teams)
        {
            foreach (var bet in Bets)
            {
                bet.Match = Matches.FirstOrDefault(x => x.Id == bet.MatchId);
            }

            //foreach (var match in Matches)
            //{
            //    match.HomeTeam = Teams.FirstOrDefault(x => x.Id == match.HomeTeamId);
            //    match.AwayTeam = Teams.FirstOrDefault(x => x.Id == match.AwayTeamId);
            //}
        }

        private static IEnumerable<Bet> CalculatePointsForEachUser(IEnumerable<Bet> Bets, IEnumerable<TyperUser> Users, ILogger log)
        {
            var betsToReturn = new List<Bet>();
            foreach (var bet in Bets)
            {
                if (!bet.IsBetProcessed)
                {
                    var user = Users.FirstOrDefault(x => x.Username == bet.BettorUserName);
                    CalculateResultPointsForUserByBet(bet, user, log);
                    betsToReturn.Add(bet);
                }
            }
            return betsToReturn;
        }

        private static void CalculateResultPointsForUserByBet(Bet bet, TyperUser user, ILogger log)
        {
            log.LogInformation($"Calculating result points for bet with ID: {bet.Id}");

            var matchResult = bet.Match;

            if (matchResult.HomeTeamScore == matchResult.AwayTeamScore && bet.HomeTeamScoreBet == bet.AwayTeamScoreBet)
            {
                if (matchResult.HomeTeamScore == bet.HomeTeamScoreBet)
                {
                    bet.BetResult = ScoreEnum.CorrectScoreBet;
                    user.TotalPoints += (int)ScoreEnum.CorrectScoreBet;
                    user.TotalExactScoreBets += 1;
                }
                else
                {
                    bet.BetResult = ScoreEnum.CorrectOutcome;
                    user.TotalPoints += (int)ScoreEnum.CorrectOutcome;
                    user.TotalCorrectWinnerBets += 1;
                }

            }
            else if (matchResult.HomeTeamScore > matchResult.AwayTeamScore && bet.HomeTeamScoreBet > bet.AwayTeamScoreBet)
            {
                if (matchResult.HomeTeamScore == bet.HomeTeamScoreBet && matchResult.AwayTeamScore == bet.AwayTeamScoreBet)
                {
                    bet.BetResult = ScoreEnum.CorrectScoreBet;
                    user.TotalPoints += (int)ScoreEnum.CorrectScoreBet;
                    user.TotalExactScoreBets += 1;
                }
                else
                {
                    bet.BetResult = ScoreEnum.CorrectOutcome;
                    user.TotalPoints += (int)ScoreEnum.CorrectOutcome;
                    user.TotalCorrectWinnerBets += 1;
                }

            }
            else if (matchResult.HomeTeamScore < matchResult.AwayTeamScore && bet.HomeTeamScoreBet < bet.AwayTeamScoreBet)
            {
                if (matchResult.HomeTeamScore == bet.HomeTeamScoreBet && matchResult.AwayTeamScore == bet.AwayTeamScoreBet)
                {
                    bet.BetResult = ScoreEnum.CorrectScoreBet;
                    user.TotalPoints += (int)ScoreEnum.CorrectScoreBet;
                    user.TotalExactScoreBets += 1;
                }
                else
                {
                    bet.BetResult = ScoreEnum.CorrectOutcome;
                    user.TotalPoints += (int)ScoreEnum.CorrectOutcome;
                    user.TotalCorrectWinnerBets += 1;
                }
            }
            else
            {
                //maybe minus points?
                bet.BetResult = (int)ScoreEnum.WrongBet;
                user.TotalPoints -= (int)ScoreEnum.WrongBet;
                user.TotalWrongBets += 1;
            }

            bet.IsBetProcessed = true;
            bet.BetProcessedDate = DateTime.Now;
        }

        public static BetDbSave MapBet(Bet bet)
        {
            return new BetDbSave()
            {
                Id = bet.Id,
                AwayTeamScoreBet = bet.AwayTeamScoreBet,
                AwayTeamWin = bet.AwayTeamWin,
                HomeTeamScoreBet = bet.HomeTeamScoreBet,
                HomeTeamWin = bet.HomeTeamWin,
                HomeAwayDrawn = bet.HomeAwayDrawn,
                BetResult = bet.BetResult,
                BettorUserName = bet.BettorUserName,
                MatchId = bet.MatchId,
                PointsFactor = bet.PointsFactor,
                BetDate = bet.BetDate,
                IsBetProcessed = bet.IsBetProcessed,
                BetProcessedDate = bet.BetProcessedDate
            };
        }
    }
}
