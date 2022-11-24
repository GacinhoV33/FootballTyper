using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballTyperAPI.Migrations
{
    public partial class TeamNameAddedToTopScorer : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Team",
                table: "TopScorers",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Team",
                table: "TopScorers");
        }
    }
}
