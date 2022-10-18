using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballTyperAPI.Migrations
{
    public partial class AddedBetMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Bets",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HomeTeamWin = table.Column<bool>(type: "bit", nullable: false),
                    HomeTeamScoreBet = table.Column<int>(type: "int", nullable: false),
                    AwayTeamWin = table.Column<bool>(type: "bit", nullable: false),
                    AwayTeamScoreBet = table.Column<int>(type: "int", nullable: false),
                    HomeAwayDrawn = table.Column<bool>(type: "bit", nullable: false),
                    PointsFactor = table.Column<float>(type: "real", nullable: false),
                    MatchId = table.Column<int>(type: "int", nullable: false),
                    BettorUserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BetDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SuccessfulBet = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Bets_Match_MatchId",
                        column: x => x.MatchId,
                        principalTable: "Match",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Bets_MatchId",
                table: "Bets",
                column: "MatchId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Bets");
        }
    }
}
