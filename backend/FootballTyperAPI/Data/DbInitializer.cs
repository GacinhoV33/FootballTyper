using FootballTyperAPI.Helpers;
using FootballTyperAPI.Models;

namespace FootballTyperAPI.Data
{
    public static class DbInitializer
    {
        public static void Initialize(FootballTyperAPIContext context)
        {
            context.Database.EnsureCreated();
            if (!context.Teams.Any())
                FillTeamsTable(context);
            if (!context.Matches.Any())
                FillMatchesTable(context);
            if (!context.Bets.Any())
                FillBetsTable(context);
        }


        public static void CleanDb(FootballTyperAPIContext context)
        {
            context.Database.EnsureCreated();

            context.RemoveRange(context.Matches);
            context.RemoveRange(context.Teams);
            context.RemoveRange(context.Bets);
            context.SaveChanges();
        }

        public static void FillMatchesTable(FootballTyperAPIContext context)
        {
            var matches = MatchHelper.GetAllMatches(context.Teams.ToList());
            context.AddRange(matches);
            context.SaveChanges();

        }

        private static void FillTeamsTable(FootballTyperAPIContext context)
        {
            var teams = TeamHelper.GetAllValidTeams();
            context.AddRange(teams);
            context.SaveChanges();
        }

        private static void FillBetsTable(FootballTyperAPIContext context)
        {
            var bets = new List<Bet>
            {
                new Bet()
                {
                    AwayTeamScoreBet = 2,
                    AwayTeamWin = true,
                    BetDate = DateTime.Now,
                    BettorUserName = "User1",
                    HomeAwayDrawn = false,
                    HomeTeamScoreBet = 0,
                    HomeTeamWin = false,
                    Match = context.Matches.Skip(0).Take(1).FirstOrDefault(),
                    PointsFactor = 1,
                    BetResult = ScoreEnum.CorrectOutcome
                },
                new Bet()
                {
                    AwayTeamScoreBet = 0,
                    AwayTeamWin = false,
                    BetDate = DateTime.Now,
                    BettorUserName = "User1",
                    HomeAwayDrawn = false,
                    HomeTeamScoreBet = 2,
                    HomeTeamWin = true,
                    Match = context.Matches.Skip(1).Take(1).FirstOrDefault(),
                    PointsFactor = 1,
                    BetResult = ScoreEnum.CorrectOutcome
                },
                new Bet()
                {
                    AwayTeamScoreBet = 2,
                    AwayTeamWin = false,
                    BetDate = DateTime.Now,
                    BettorUserName = "User1",
                    HomeAwayDrawn = true,
                    HomeTeamScoreBet = 2,
                    HomeTeamWin = false,
                    Match = context.Matches.Skip(2).Take(1).FirstOrDefault(),
                    PointsFactor = 1,
                    BetResult = ScoreEnum.CorrectOutcome
                },
                new Bet()
                {
                    AwayTeamScoreBet = 2,
                    AwayTeamWin = false,
                    BetDate = DateTime.Now,
                    BettorUserName = "User1",
                    HomeAwayDrawn = false,
                    HomeTeamScoreBet = 3,
                    HomeTeamWin = true,
                    Match = context.Matches.Skip(3).Take(1).FirstOrDefault(),
                    PointsFactor = 1,
                    BetResult = ScoreEnum.CorrectOutcome
                },

                new Bet()
                {
                    AwayTeamScoreBet = 2,
                    AwayTeamWin = true,
                    BetDate = DateTime.Now,
                    BettorUserName = "User2",
                    HomeAwayDrawn = false,
                    HomeTeamScoreBet = 0,
                    HomeTeamWin = false,
                    Match = context.Matches.Skip(0).Take(1).FirstOrDefault(),
                    PointsFactor = 1,
                    BetResult = ScoreEnum.CorrectOutcome
                },
                new Bet()
                {
                    AwayTeamScoreBet = 0,
                    AwayTeamWin = false,
                    BetDate = DateTime.Now,
                    BettorUserName = "User2",
                    HomeAwayDrawn = false,
                    HomeTeamScoreBet = 2,
                    HomeTeamWin = true,
                    Match = context.Matches.Skip(1).Take(1).FirstOrDefault(),
                    PointsFactor = 1,
                    BetResult = ScoreEnum.WrongBet
                },
                new Bet()
                {
                    AwayTeamScoreBet = 2,
                    AwayTeamWin = false,
                    BetDate = DateTime.Now,
                    BettorUserName = "User2",
                    HomeAwayDrawn = true,
                    HomeTeamScoreBet = 2,
                    HomeTeamWin = false,
                    Match = context.Matches.Skip(2).Take(1).FirstOrDefault(),
                    PointsFactor = 1,
                    BetResult = ScoreEnum.WrongBet
                },
                new Bet()
                {
                    AwayTeamScoreBet = 2,
                    AwayTeamWin = false,
                    BetDate = DateTime.Now,
                    BettorUserName = "User2",
                    HomeAwayDrawn = false,
                    HomeTeamScoreBet = 3,
                    HomeTeamWin = true,
                    Match = context.Matches.Skip(3).Take(1).FirstOrDefault(),
                    PointsFactor = 1,
                    BetResult = ScoreEnum.CorrectScoreBet
                },
            };
            context.AddRange(bets);
            context.SaveChanges();
        }
    }
}
