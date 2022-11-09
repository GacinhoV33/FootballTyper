using FootballTyperAPI.Models;
using System.Globalization;
using System.Net;
using System.Text.Json;

namespace FootballTyperAPI.Helpers
{
    public static class MatchHelper
    {
        public static string URL = "https://fixturedownload.com/feed/json/fifa-world-cup-2022";
        public static List<Match> GetAllMatches(List<Team> allTeams)
        {
            var jsonString = new WebClient().DownloadString(URL);
            var allMatches = JsonSerializer.Deserialize<List<MatchJSON>>(jsonString);
            return allMatches.Select(t => MapMatch(t, allTeams)).ToList();
        }

        public static List<MatchJSON> GetAllMatchesJSON()
        {
            var jsonString = new WebClient().DownloadString(URL);
            var allMatches = JsonSerializer.Deserialize<List<MatchJSON>>(jsonString);
            return allMatches;
        }

        private static Match MapMatch(MatchJSON matchJson, List<Team> allTeams)
        {
            return new Match()
            {
                HomeTeam = allTeams.FirstOrDefault(t => t.Name == matchJson.HomeTeam),
                AwayTeam = allTeams.FirstOrDefault(t => t.Name == matchJson.AwayTeam),
                HomeTeamScore = matchJson.HomeTeamScore == null ? -1 : int.Parse(matchJson.HomeTeamScore),
                AwayTeamScore = matchJson.AwayTeamScore == null ? -1 : int.Parse(matchJson.AwayTeamScore),
                Group = matchJson.Group,
                Location = matchJson.Location,
                Date = DateTime.ParseExact(matchJson.DateUtc, "yyyy-MM-dd HH:mm:ssZ", CultureInfo.InvariantCulture),
                MatchNumber = matchJson.MatchNumber,
                RoundNumber = matchJson.RoundNumber,
                Stage = GetStage(matchJson.RoundNumber)
            };
        }

        public static Stage GetStage(int roundNumber)
        {
            Stage stage = Stage.Group;
            if (roundNumber <= 3)
                stage = Stage.Group;
            else if (roundNumber == 4)
                stage = Stage.Eightfinal;
            else if (roundNumber == 5)
                stage = Stage.Quarterfinal;
            else if (roundNumber == 6)
                stage = Stage.Semifinal;
            else if (roundNumber == 7)
                stage = Stage.Final;

            return stage;
        }

        public static List<ScoreEnum> ConvertBetsToScoreEnums(List<Bet> bets)
        {
            var scoreEnums = new List<ScoreEnum>();
            foreach (var bet in bets)
            {
                DefineScoreEnum(bet, out ScoreEnum score);
                scoreEnums.Add(score);
            }
            return scoreEnums;
        }

        private static void DefineScoreEnum(Bet bet, out ScoreEnum score)
        {
            var matchResult = bet.Match;

            if (matchResult.HomeTeamScore == matchResult.AwayTeamScore && bet.HomeTeamScoreBet == bet.AwayTeamScoreBet)
            {
                score = ScoreEnum.CorrectOutcome;
                if (matchResult.HomeTeamScore == bet.HomeTeamScoreBet)
                {
                    score = ScoreEnum.CorrectScoreBet;
                }
                return;
            }
            else if (matchResult.HomeTeamScore > matchResult.AwayTeamScore && bet.HomeTeamScoreBet > bet.AwayTeamScoreBet)
            {
                score = ScoreEnum.CorrectOutcome;
                if (matchResult.HomeTeamScore == bet.HomeTeamScoreBet && matchResult.AwayTeamScore == bet.AwayTeamScoreBet)
                {
                    score = ScoreEnum.CorrectScoreBet;
                }
                return;
            }
            else if (matchResult.HomeTeamScore < matchResult.AwayTeamScore && bet.HomeTeamScoreBet < bet.AwayTeamScoreBet)
            {
                score = ScoreEnum.CorrectOutcome;
                if (matchResult.HomeTeamScore == bet.HomeTeamScoreBet && matchResult.AwayTeamScore == bet.AwayTeamScoreBet)
                {
                    score = ScoreEnum.CorrectScoreBet;
                }
                return;
            }
            score = ScoreEnum.WrongBet;
        }

    }
}
