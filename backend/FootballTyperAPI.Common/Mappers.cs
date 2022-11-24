using FootballTyperAPI.Models;
using FootballTyperAPI.Models.Api;

namespace FootballTyperAPI.Common
{
    public static class Mappers
    {
        public static MatchApi MapMatch(Match match)
        {
            return new MatchApi()
            {
                HomeTeam = match.HomeTeam?.Name,
                AwayTeam = match.AwayTeam?.Name,
                HomeTeamScore = match.HomeTeamScore,
                AwayTeamScore = match.AwayTeamScore,
                Group = match.Group?.Replace("Group ", ""),
                Stadium = match.Location,
                Date = match.Date,
                Referee = match.Referee
            };
        }

        public static MatchDbSave MapMatchDbSave(Match match)
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
                MatchProcessedDate = match.MatchProcessedDate,
                Referee = match.Referee,
                Town = match.Town,
                Stage = match.Stage
            };
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
