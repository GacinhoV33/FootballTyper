using FootballTyperAPI.Models;
using System.Text.Json;

namespace FootballTyperAPI.Common
{
    public static class RankingHelper
    {
        public static List<Ranking> CreateRanking(IEnumerable<TyperUser> Users)
        {
            var ranking = Users.Select(x => new Ranking() { User = x }).ToList();
            foreach (var league in Users.Select(x => JsonSerializer.Deserialize<string[]>(x.LeaguesStr)).SelectMany(x => x).Distinct())
            {
                var sortedUsers = Users.Where(x => x.LeaguesStr.Contains(league))
                    .OrderByDescending(x => x.TotalPoints)
                    .ThenByDescending(y => y.TotalExactScoreBets)
                    .ThenByDescending(z => z.TotalCorrectWinnerBets);
                int pos = 1;
                foreach (var user in sortedUsers)
                {
                    int? minPos = null;
                    var userWithSamePoints = Users.Where(x => x.TotalPoints == user.TotalPoints && x != user).ToList();
                    if (userWithSamePoints.Any())
                    {
                        var rankingUsersWithSamePoints = userWithSamePoints.Select(y => ranking.FirstOrDefault(x => x.User == y)).ToList();
                        if (rankingUsersWithSamePoints.Any())
                        {
                            var existingRankingUsersWithSamePoints = rankingUsersWithSamePoints.Where(x => x.LeaguePosition.ContainsKey(league)).ToList();
                            if (existingRankingUsersWithSamePoints.Any())
                            {
                                minPos = existingRankingUsersWithSamePoints.Min(x => x.LeaguePosition[league]);
                            }
                        }
                    }
                    ranking.FirstOrDefault(x => x.User == user).LeaguePosition.Add(league, minPos.HasValue ? minPos.Value : pos++);
                }
            }
            return ranking;
        }

        public static void UpdateRankStatus(IEnumerable<TyperUser> Users, List<Ranking> prevRanking, List<Ranking> updatedRanking)
        {
            foreach (var user in Users)
            {
                var userFromUpdateRanking = updatedRanking.FirstOrDefault(x => x.User == user);
                var posChangeDict = CalcPosChange(prevRanking.FirstOrDefault(x => x.User == user), userFromUpdateRanking);
                user.RankStatus = JsonSerializer.Serialize(posChangeDict);
                user.PositionStr = JsonSerializer.Serialize(userFromUpdateRanking.LeaguePosition);
            }
        }

        public static Dictionary<string, int> CalcPosChange(Ranking prevRanking, Ranking updatedRanking)
        {
            var rankStat = new Dictionary<string, int>();
            foreach (var league in updatedRanking.LeaguePosition.Keys)
            {
                rankStat.Add(league, updatedRanking.LeaguePosition[league] - prevRanking.LeaguePosition[league]);
            }
            return rankStat;
        }
    }
}
