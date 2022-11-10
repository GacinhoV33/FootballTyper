using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballTyperAPI.Migrations
{
    public partial class BetAndMatchModelsChangedIsProcessedAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "MatchProcessedDate",
                table: "Match",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "BetProcessedDate",
                table: "Bets",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsBetProcessed",
                table: "Bets",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MatchProcessedDate",
                table: "Match");

            migrationBuilder.DropColumn(
                name: "BetProcessedDate",
                table: "Bets");

            migrationBuilder.DropColumn(
                name: "IsBetProcessed",
                table: "Bets");
        }
    }
}
