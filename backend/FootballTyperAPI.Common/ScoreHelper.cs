using FootballTyperAPI.Models;
using Microsoft.Extensions.Logging;

namespace FootballTyperAPI.Common
{
    public static class ScoreHelper
    {
        public static void UpdateData(IEnumerable<Bet> Bets, IEnumerable<Match> Matches)
        {
            foreach (var bet in Bets)
            {
                bet.Match = Matches.FirstOrDefault(x => x.Id == bet.MatchId);
            }
        }

        public static void UpdateLastFiveUserBets(IEnumerable<Bet> Bets, IEnumerable<TyperUserApi> Users)
        {
            foreach (var user in Users)
            {
                var lastFiveBets = Bets.Where(x => x.BettorUserName == user.Username && x.Match.IsMatchValid && x.IsBetProcessed && x.Match.Date <= DateTime.Now)
                .OrderByDescending(t => t.Match.Date)
                .Take(5)
                .ToList();
                var lastFiveBetsEnumList = MatchHelper.ConvertBetsToScoreEnums(lastFiveBets);
                user.LastFiveBets = string.Join(",", lastFiveBetsEnumList.Select(x => ((int)x).ToString()));
            }
        }

        public static void UpdateLastFiveUserBets(IEnumerable<Bet> Bets, IEnumerable<TyperUser> Users)
        {
            foreach (var user in Users)
            {
                var lastFiveBets = Bets.Where(x => x.BettorUserName == user.Username && x.Match.Date <= DateTime.Now && x.Match.IsMatchValid && x.IsBetProcessed)
                .OrderByDescending(t => t.Match.Date)
                .Take(5)
                .ToList();
                var lastFiveBetsEnumList = MatchHelper.ConvertBetsToScoreEnums(lastFiveBets);
                user.LastFiveBets = string.Join(",", lastFiveBetsEnumList.Select(x => ((int)x).ToString()));
            }
        }

        public static IEnumerable<Match> CalculatePointsForEachTeam(IEnumerable<Match> Matches, ILogger log, ref bool hasDataChanged)
        {
            var matchesToReturn = new List<Match>();
            foreach (var match in Matches)
            {
                if (match.HomeTeamScore != -1 && match.AwayTeamScore != -1 && !match.IsMatchProcessed)
                {
                    CalculateResultPointsForTeamByMatch(match, log);
                    matchesToReturn.Add(match);
                    hasDataChanged = true;
                }
            }
            return matchesToReturn;
        }

        public static void CalculateResultPointsForTeamByMatch(Match match, ILogger log)
        {
            log.LogInformation($"Calculating result points for match with ID: {match.Id}");
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
            match.MatchProcessedDate = DateTime.Now;
        }

        public static IEnumerable<Bet> CalculatePointsForEachUser(IEnumerable<Bet> Bets, IEnumerable<TyperUser> Users, ILogger log, ref bool hasDataChanged)
        {
            var betsToReturn = new List<Bet>();
            foreach (var bet in Bets)
            {
                if (!bet.IsBetProcessed)
                {
                    if (bet.Match.IsMatchValid)
                    {
                        var user = Users.FirstOrDefault(x => x.Username == bet.BettorUserName);
                        CalculateResultPointsForUserByBet(bet, user, log);
                        hasDataChanged = true;
                    }
                    betsToReturn.Add(bet);
                }
            }
            return betsToReturn;
        }

        public static void CalculatePointsForEachUser(IEnumerable<Bet> Bets, IEnumerable<TyperUserApi> Users)
        {
            foreach (var bet in Bets)
            {
                if (bet.Match.IsMatchValid && bet.IsBetProcessed)
                {
                    var user = Users.FirstOrDefault(x => x.Username == bet.BettorUserName);
                    CalculateResultPointsForUserByBet(bet, user);
                }
            }
        }

        public static void CalculateResultPointsForUserByBet(Bet bet, TyperUserApi user)
        {
            var matchResult = bet.Match;

            if (matchResult.HomeTeamScore == matchResult.AwayTeamScore && bet.HomeTeamScoreBet == bet.AwayTeamScoreBet)
            {
                if (matchResult.HomeTeamScore == bet.HomeTeamScoreBet)
                {
                    bet.BetResult = ScoreEnum.CorrectScoreBet;
                    user.TotalPoints += GetPointsByScoreResultAndStage(ScoreEnum.CorrectScoreBet, bet.Match.Stage);
                    user.TotalExactScoreBets += 1;
                }
                else
                {
                    bet.BetResult = ScoreEnum.CorrectOutcome;
                    user.TotalPoints += GetPointsByScoreResultAndStage(ScoreEnum.CorrectOutcome, bet.Match.Stage);
                    user.TotalCorrectWinnerBets += 1;
                }

            }
            else if (matchResult.HomeTeamScore > matchResult.AwayTeamScore && bet.HomeTeamScoreBet > bet.AwayTeamScoreBet)
            {
                if (matchResult.HomeTeamScore == bet.HomeTeamScoreBet && matchResult.AwayTeamScore == bet.AwayTeamScoreBet)
                {
                    bet.BetResult = ScoreEnum.CorrectScoreBet;
                    user.TotalPoints += GetPointsByScoreResultAndStage(ScoreEnum.CorrectScoreBet, bet.Match.Stage);
                    user.TotalExactScoreBets += 1;
                }
                else
                {
                    bet.BetResult = ScoreEnum.CorrectOutcome;
                    user.TotalPoints += GetPointsByScoreResultAndStage(ScoreEnum.CorrectOutcome, bet.Match.Stage);
                    user.TotalCorrectWinnerBets += 1;
                }

            }
            else if (matchResult.HomeTeamScore < matchResult.AwayTeamScore && bet.HomeTeamScoreBet < bet.AwayTeamScoreBet)
            {
                if (matchResult.HomeTeamScore == bet.HomeTeamScoreBet && matchResult.AwayTeamScore == bet.AwayTeamScoreBet)
                {
                    bet.BetResult = ScoreEnum.CorrectScoreBet;
                    user.TotalPoints += GetPointsByScoreResultAndStage(ScoreEnum.CorrectScoreBet, bet.Match.Stage);
                    user.TotalExactScoreBets += 1;
                }
                else
                {
                    bet.BetResult = ScoreEnum.CorrectOutcome;
                    user.TotalPoints += GetPointsByScoreResultAndStage(ScoreEnum.CorrectOutcome, bet.Match.Stage);
                    user.TotalCorrectWinnerBets += 1;
                }
            }
            else
            {
                bet.BetResult = (int)ScoreEnum.WrongBet;
                user.TotalPoints -= GetPointsByScoreResultAndStage(ScoreEnum.WrongBet, bet.Match.Stage);
                user.TotalWrongBets += 1;
            }
        }

        public static void CalculateResultPointsForUserByBet(Bet bet, TyperUser user, ILogger log)
        {
            log.LogInformation($"Calculating result points for bet with ID: {bet.Id}");

            var matchResult = bet.Match;

            if (matchResult.HomeTeamScore == matchResult.AwayTeamScore && bet.HomeTeamScoreBet == bet.AwayTeamScoreBet)
            {
                if (matchResult.HomeTeamScore == bet.HomeTeamScoreBet)
                {
                    bet.BetResult = ScoreEnum.CorrectScoreBet;
                    user.TotalPoints += GetPointsByScoreResultAndStage(ScoreEnum.CorrectScoreBet, bet.Match.Stage);
                    user.TotalExactScoreBets += 1;
                }
                else
                {
                    bet.BetResult = ScoreEnum.CorrectOutcome;
                    user.TotalPoints += GetPointsByScoreResultAndStage(ScoreEnum.CorrectOutcome, bet.Match.Stage);
                    user.TotalCorrectWinnerBets += 1;
                }

            }
            else if (matchResult.HomeTeamScore > matchResult.AwayTeamScore && bet.HomeTeamScoreBet > bet.AwayTeamScoreBet)
            {
                if (matchResult.HomeTeamScore == bet.HomeTeamScoreBet && matchResult.AwayTeamScore == bet.AwayTeamScoreBet)
                {
                    bet.BetResult = ScoreEnum.CorrectScoreBet;
                    user.TotalPoints += GetPointsByScoreResultAndStage(ScoreEnum.CorrectScoreBet, bet.Match.Stage);
                    user.TotalExactScoreBets += 1;
                }
                else
                {
                    bet.BetResult = ScoreEnum.CorrectOutcome;
                    user.TotalPoints += GetPointsByScoreResultAndStage(ScoreEnum.CorrectOutcome, bet.Match.Stage);
                    user.TotalCorrectWinnerBets += 1;
                }

            }
            else if (matchResult.HomeTeamScore < matchResult.AwayTeamScore && bet.HomeTeamScoreBet < bet.AwayTeamScoreBet)
            {
                if (matchResult.HomeTeamScore == bet.HomeTeamScoreBet && matchResult.AwayTeamScore == bet.AwayTeamScoreBet)
                {
                    bet.BetResult = ScoreEnum.CorrectScoreBet;
                    user.TotalPoints += GetPointsByScoreResultAndStage(ScoreEnum.CorrectScoreBet, bet.Match.Stage);
                    user.TotalExactScoreBets += 1;
                }
                else
                {
                    bet.BetResult = ScoreEnum.CorrectOutcome;
                    user.TotalPoints += GetPointsByScoreResultAndStage(ScoreEnum.CorrectOutcome, bet.Match.Stage);
                    user.TotalCorrectWinnerBets += 1;
                }
            }
            else
            {
                //maybe minus points?
                bet.BetResult = (int)ScoreEnum.WrongBet;
                user.TotalPoints -= GetPointsByScoreResultAndStage(ScoreEnum.WrongBet, bet.Match.Stage);
                user.TotalWrongBets += 1;
            }

            bet.IsBetProcessed = true;
            bet.BetProcessedDate = DateTime.Now;
        }

        public static int GetPointsByScoreResultAndStage(ScoreEnum matchOutcome, Stage? stage)
        {
            TyperScores score = TyperScores.WrongScore;
            if (stage == Stage.Group)
            {
                if (matchOutcome == ScoreEnum.CorrectOutcome)
                {
                    score = TyperScores.GroupCorrectWinnerOrDraw;
                }
                else if (matchOutcome == ScoreEnum.CorrectScoreBet)
                {
                    score = TyperScores.GroupExactScore;
                }
            }
            else if (stage == Stage.Eightfinal)
            {
                if (matchOutcome == ScoreEnum.CorrectOutcome)
                {
                    score = TyperScores.EightfinalCorrectWinnerOrDraw;
                }
                else if (matchOutcome == ScoreEnum.CorrectScoreBet)
                {
                    score = TyperScores.EightfinalExactScore;
                }
            }
            else if (stage == Stage.Quarterfinal)
            {
                if (matchOutcome == ScoreEnum.CorrectOutcome)
                {
                    score = TyperScores.QuarterfinalCorrectWinnerOrDraw;
                }
                else if (matchOutcome == ScoreEnum.CorrectScoreBet)
                {
                    score = TyperScores.QuarterfinalExactScore;
                }
            }
            else if (stage == Stage.Semifinal)
            {
                if (matchOutcome == ScoreEnum.CorrectOutcome)
                {
                    score = TyperScores.SemifinalWinnerOrDraw;
                }
                else if (matchOutcome == ScoreEnum.CorrectScoreBet)
                {
                    score = TyperScores.SemifinalExactScore;
                }
            }
            else if (stage == Stage.Final)
            {
                if (matchOutcome == ScoreEnum.CorrectOutcome)
                {
                    score = TyperScores.FinalCorrectWinnerOrDraw;
                }
                else if (matchOutcome == ScoreEnum.CorrectScoreBet)
                {
                    score = TyperScores.FinalExactScore;
                }
            }

            return (int)score;
        }

        public static void CleanUsersData(IEnumerable<TyperUserApi> users)
        {
            foreach (var user in users)
            {
                user.TotalPoints = 0;
                user.TotalCorrectWinnerBets = 0;
                user.TotalExactScoreBets = 0;
                user.TotalWrongBets = 0;
                user.LastFiveBets = "";
            }
        }
    }
}
