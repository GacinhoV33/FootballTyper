using FootballTyperAPI.Helpers;

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
        }


        public static void CleanDb(FootballTyperAPIContext context)
        {
            context.Database.EnsureCreated();

            context.RemoveRange(context.Matches);
            context.RemoveRange(context.Teams);
            //context.RemoveRange(context.Bets);
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
    }
}
