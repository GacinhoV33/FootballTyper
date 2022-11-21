using FootballTyperAPI.Models;
using Microsoft.EntityFrameworkCore;
using FootballTyperAPI.Models.RapidApi;

namespace FootballTyperAPI.Data
{
    public class FootballTyperAPIContext : DbContext
    {
        public FootballTyperAPIContext(DbContextOptions<FootballTyperAPIContext> options)
            : base(options)
        {
        }

        public DbSet<Match> Matches { get; set; } = default!;
        public DbSet<Team> Teams { get; set; } = default!;
        public DbSet<Bet> Bets { get; set; } = default!;
        public DbSet<TyperUser> TyperUser { get; set; }

        public DbSet<TopScorerDb> TopScorers { get; set; } = default!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Match>().ToTable("Match");
            modelBuilder.Entity<Team>().ToTable("Teams");
            modelBuilder.Entity<Bet>().ToTable("Bets");

            modelBuilder.Entity<TopScorerDb>().ToTable("TopScorers");

        }

        public async Task<List<Match>> GetAllMatches()
        {
            return await Matches.Include("HomeTeam").Include("AwayTeam").ToListAsync();
        }

        public async Task<List<Match>> GetAllGroupMatches()
        {
            return (await GetAllMatches()).Where(t => t.RoundNumber <= 3).ToList();
        }

        public async Task<List<Match>> GetAllKnockoutMatches()
        {
            return (await GetAllMatches()).Where(t => t.RoundNumber > 3).ToList();
        }

        public List<Team> GetAllTeams()
        {
            return Teams.ToList();
        }

        public async Task<List<Bet>> GetAllBets()
        {
            return await Bets.Include("Match").Include("Match.HomeTeam").Include("Match.AwayTeam").ToListAsync();
        }
    }
}
