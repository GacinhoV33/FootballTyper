using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballTyperAPI.Migrations
{
    public partial class YellowRedCardAndRapidApiIdAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RapidApiId",
                table: "TopScorers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "YellowRedCards",
                table: "TopScorers",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RapidApiId",
                table: "TopScorers");

            migrationBuilder.DropColumn(
                name: "YellowRedCards",
                table: "TopScorers");
        }
    }
}
