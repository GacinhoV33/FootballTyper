using FootballTyperAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Company.Function
{
    public static class InitializeTableBets
    {
        // Visit https://aka.ms/sqlbindingsoutput to learn how to use this output binding
        [FunctionName("InitializeTableBets")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "InitializeTableBets")] HttpRequest req,
            [Sql("SELECT * FROM [dbo].[Match] WHERE HomeTeamId IS NOT NULL",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> Matches,
            [Sql("[dbo].[Bets]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] out BetDbSave[] outBets,
            ILogger log)
        {
            if (Matches.Any())
            {
                var bets = new List<BetDbSave>
                {
                    new BetDbSave()
                    {
                        AwayTeamScoreBet = 2,
                        AwayTeamWin = true,
                        BetDate = DateTime.Now,
                        BettorUserName = "User1",
                        HomeAwayDrawn = false,
                        HomeTeamScoreBet = 0,
                        HomeTeamWin = false,
                        MatchId = Matches.Skip(0).Take(1).FirstOrDefault().Id,
                        PointsFactor = 1,
                        BetResult = ScoreEnum.CorrectOutcome
                    },
                    new BetDbSave()
                    {
                        AwayTeamScoreBet = 0,
                        AwayTeamWin = false,
                        BetDate = DateTime.Now,
                        BettorUserName = "User1",
                        HomeAwayDrawn = false,
                        HomeTeamScoreBet = 2,
                        HomeTeamWin = true,
                        MatchId = Matches.Skip(1).Take(1).FirstOrDefault().Id,
                        PointsFactor = 1,
                        BetResult = ScoreEnum.CorrectOutcome
                    },
                    new BetDbSave()
                    {
                        AwayTeamScoreBet = 2,
                        AwayTeamWin = false,
                        BetDate = DateTime.Now,
                        BettorUserName = "User1",
                        HomeAwayDrawn = true,
                        HomeTeamScoreBet = 2,
                        HomeTeamWin = false,
                        MatchId = Matches.Skip(2).Take(1).FirstOrDefault().Id,
                        PointsFactor = 1,
                        BetResult = ScoreEnum.CorrectOutcome
                    },
                    new BetDbSave()
                    {
                        AwayTeamScoreBet = 2,
                        AwayTeamWin = false,
                        BetDate = DateTime.Now,
                        BettorUserName = "User1",
                        HomeAwayDrawn = false,
                        HomeTeamScoreBet = 3,
                        HomeTeamWin = true,
                        MatchId = Matches.Skip(3).Take(1).FirstOrDefault().Id,
                        PointsFactor = 1,
                        BetResult = ScoreEnum.CorrectOutcome
                    },
                    new BetDbSave()
                    {
                        AwayTeamScoreBet = 2,
                        AwayTeamWin = false,
                        BetDate = DateTime.Now,
                        BettorUserName = "User1",
                        HomeAwayDrawn = false,
                        HomeTeamScoreBet = 3,
                        HomeTeamWin = true,
                        MatchId = Matches.Skip(4).Take(1).FirstOrDefault().Id,
                        PointsFactor = 1,
                        BetResult = ScoreEnum.CorrectScoreBet
                    },

                    new BetDbSave()
                    {
                        AwayTeamScoreBet = 2,
                        AwayTeamWin = true,
                        BetDate = DateTime.Now,
                        BettorUserName = "User2",
                        HomeAwayDrawn = false,
                        HomeTeamScoreBet = 0,
                        HomeTeamWin = false,
                        MatchId = Matches.Skip(0).Take(1).FirstOrDefault().Id,
                        PointsFactor = 1,
                        BetResult = ScoreEnum.CorrectOutcome
                    },
                    new BetDbSave()
                    {
                        AwayTeamScoreBet = 0,
                        AwayTeamWin = false,
                        BetDate = DateTime.Now,
                        BettorUserName = "User2",
                        HomeAwayDrawn = false,
                        HomeTeamScoreBet = 2,
                        HomeTeamWin = true,
                        MatchId = Matches.Skip(1).Take(1).FirstOrDefault().Id,
                        PointsFactor = 1,
                        BetResult = ScoreEnum.WrongBet
                    },
                    new BetDbSave()
                    {
                        AwayTeamScoreBet = 2,
                        AwayTeamWin = false,
                        BetDate = DateTime.Now,
                        BettorUserName = "User2",
                        HomeAwayDrawn = true,
                        HomeTeamScoreBet = 2,
                        HomeTeamWin = false,
                        MatchId = Matches.Skip(2).Take(1).FirstOrDefault().Id,
                        PointsFactor = 1,
                        BetResult = ScoreEnum.WrongBet
                    },
                    new BetDbSave()
                    {
                        AwayTeamScoreBet = 2,
                        AwayTeamWin = false,
                        BetDate = DateTime.Now,
                        BettorUserName = "User2",
                        HomeAwayDrawn = false,
                        HomeTeamScoreBet = 3,
                        HomeTeamWin = true,
                        MatchId = Matches.Skip(3).Take(1).FirstOrDefault().Id,
                        PointsFactor = 1,
                        BetResult = ScoreEnum.CorrectScoreBet
                    },
                    new BetDbSave()
                    {
                        AwayTeamScoreBet = 2,
                        AwayTeamWin = false,
                        BetDate = DateTime.Now,
                        BettorUserName = "User2",
                        HomeAwayDrawn = false,
                        HomeTeamScoreBet = 3,
                        HomeTeamWin = true,
                        MatchId = Matches.Skip(4).Take(1).FirstOrDefault().Id,
                        PointsFactor = 1,
                        BetResult = ScoreEnum.CorrectScoreBet
                    },
                };

                outBets = bets.ToArray();
            }
            else
            {
                log.LogInformation("Cannot fill Bets table. Matches table is empty");
                outBets = null;
            }

            return new OkObjectResult(new { Ok = true });
        }
    }

}
