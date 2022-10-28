using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballTyperAPI.Migrations
{
    public partial class BetResultChangedToEnumScore : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SuccessfulBet",
                table: "Bets");

            migrationBuilder.AddColumn<int>(
                name: "BetResult",
                table: "Bets",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BetResult",
                table: "Bets");

            migrationBuilder.AddColumn<bool>(
                name: "SuccessfulBet",
                table: "Bets",
                type: "bit",
                nullable: true);
        }
    }
}
