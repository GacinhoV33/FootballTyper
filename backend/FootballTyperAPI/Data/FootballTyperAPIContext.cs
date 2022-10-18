using FootballTyperAPI.Models;
using Microsoft.EntityFrameworkCore;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Match>().ToTable("Match");
            modelBuilder.Entity<Team>().ToTable("Teams");
            modelBuilder.Entity<Bet>().ToTable("Bets");

        }

        public async Task<List<Match>> GetAllMatches()
        {
            return await Matches.Include("HomeTeam").Include("AwayTeam").ToListAsync();
        }

        public async Task<List<Match>> GetAllGroupMatches()
        {
            return (await GetAllMatches()).Where(t => t.RoundNumber <= 3).ToList();
        }

        public List<Team> GetAllTeams()
        {
            return Teams.ToList();
        }

        public async Task<List<Bet>> GetAllBets()
        {
            return await Bets.Include("Match").ToListAsync();
        }

    }
}
