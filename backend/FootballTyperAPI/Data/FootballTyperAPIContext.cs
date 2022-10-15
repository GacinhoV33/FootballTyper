using FootballTyperAPI.Helpers;
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Match>().ToTable("Match");
            modelBuilder.Entity<Team>().ToTable("Teams");
            //modelBuilder.Entity<Bet>().ToTable("Bets");

        }
    }
}
