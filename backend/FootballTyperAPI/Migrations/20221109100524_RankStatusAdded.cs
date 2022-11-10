using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballTyperAPI.Migrations
{
    public partial class RankStatusAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RankStatus",
                table: "TyperUser",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RankStatus",
                table: "TyperUser");
        }
    }
}
