using FootballTyperAPI.Models;
using System.Text.Json;

namespace FootballTyperAPI.Common
{
    public static class RankingHelper
    {
        public static List<Ranking> CreateRanking(IEnumerable<TyperUser> Users, int startPos = 0)
        {
            var ranking = Users.Select(x => new Ranking() { User = x }).ToList();
            foreach (var league in Users.Select(x => JsonSerializer.Deserialize<string[]>(x.LeaguesStr)).SelectMany(x => x).Distinct())
            {
                var sortedUsers = Users.Where(x => x.LeaguesStr.Contains(league))
                    .OrderByDescending(x => x.TotalPoints)
                    .ThenByDescending(y => y.TotalExactScoreBets)
                    .ThenByDescending(z => z.TotalCorrectWinnerBets);
                int pos = 1;
                if (sortedUsers.All(x => x.TotalPoints == 0))
                {
                    pos = startPos;
                }
                foreach (var user in sortedUsers)
                {
                    int posToAdd = 1;
                    int? minPos = null;
                    var userWithSamePoints = Users.Where(x => x.TotalPoints == user.TotalPoints
                        && x != user
                        && x.TotalCorrectWinnerBets == user.TotalCorrectWinnerBets
                        && x.TotalExactScoreBets == user.TotalExactScoreBets)
                        .ToList();
                    if (userWithSamePoints.Any())
                    {
                        var rankingUsersWithSamePoints = userWithSamePoints.Select(y => ranking.FirstOrDefault(x => x.User == y)).ToList();
                        if (rankingUsersWithSamePoints.Any())
                        {
                            var existingRankingUsersWithSamePoints = rankingUsersWithSamePoints.Where(x => x.LeaguePosition.ContainsKey(league)).ToList();
                            if (existingRankingUsersWithSamePoints.Any())
                            {
                                minPos = existingRankingUsersWithSamePoints.Min(x => x.LeaguePosition[league]);
                                posToAdd = existingRankingUsersWithSamePoints.Count() - 1;
                            }
                        }
                    }
                    ranking.FirstOrDefault(x => x.User == user).LeaguePosition.Add(league, minPos.HasValue ? minPos.Value : pos);
                    pos += posToAdd;
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
                if ((prevRanking.LeaguePosition[league] == 0) && (prevRanking.LeaguePosition[league] - updatedRanking.LeaguePosition[league] < 0))
                {
                    rankStat.Add(league, updatedRanking.LeaguePosition[league] - prevRanking.LeaguePosition[league]);
                    //rankStat.Add(league, 0);
                }
                else
                {
                    rankStat.Add(league, prevRanking.LeaguePosition[league] - updatedRanking.LeaguePosition[league]);
                }
            }
            return rankStat;
        }
    }
}
