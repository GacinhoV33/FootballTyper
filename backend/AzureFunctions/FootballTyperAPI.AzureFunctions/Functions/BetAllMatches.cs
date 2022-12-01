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
    public static class BetAllMatches
    {
        [FunctionName("BetAllMatches")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "BetAllMatches")] HttpRequest req,
            [Sql("SELECT * FROM [dbo].[Bets]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Bet> Bets,
            [Sql("SELECT * FROM [dbo].[Teams]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Team> Teams,
            [Sql("SELECT * FROM [dbo].[Match] WHERE HomeTeamId IS NOT NULL",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<Match> Matches,
            [Sql("[dbo].[Bets]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] out BetDbSave[] outBets,
            ILogger log)
        {
            log.LogInformation($"-------------------------------------------------------------------------");
            log.LogInformation($"Execution date: {DateTime.Now}");
            log.LogInformation($"Starting execution of: BetAllMatches");
            //var playerUsername = req.Headers.Where(x => x.Key == "userName").First().Value.ToString();
            var playerUsername = "danielgacek97";
            //var playerUsername = "gacek.filip12";
            var betsList = new List<BetDbSave>();
            UpdateData(Matches, Teams);
            var matchesWithbetsAlreadyMadeByUser = Bets.Where(x => x.BettorUserName == playerUsername).Select(y => y.MatchId);
            if (Matches.Count() > 0)
            {
                foreach (var match in Matches.Where(x => !matchesWithbetsAlreadyMadeByUser.Contains(x.Id)))
                {
                    var awayTeamScoreBet = Random.Shared.Next(0, 3);
                    var homeTeamScoreBet = Random.Shared.Next(0, 3);
                    var newBet = new BetDbSave()
                    {
                        AwayTeamScoreBet = awayTeamScoreBet,
                        HomeTeamScoreBet = homeTeamScoreBet,
                        AwayTeamWin = awayTeamScoreBet > homeTeamScoreBet,
                        BetDate = DateTime.Now,
                        BettorUserName = playerUsername,
                        HomeAwayDrawn = homeTeamScoreBet == awayTeamScoreBet,
                        HomeTeamWin = homeTeamScoreBet > awayTeamScoreBet,
                        MatchId = match.Id,
                        PointsFactor = 1
                    };
                    betsList.Add(newBet);
                    log.LogInformation($"ID of bet: {newBet.Id}. Bet: [{match.AwayTeam.Name}] {newBet.AwayTeamScoreBet} - {newBet.HomeTeamScoreBet} [{match.HomeTeam.Name}]");
                }
            }
            else
            {
                log.LogInformation("No matches in Database");
            }

            outBets = betsList.ToArray();
            log.LogInformation($"Ending execution of: BetAllMatches");
            log.LogInformation($"-------------------------------------------------------------------------");
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
