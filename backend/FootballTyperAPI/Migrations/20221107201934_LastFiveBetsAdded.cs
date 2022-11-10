using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballTyperAPI.Migrations
{
    public partial class LastFiveBetsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "League");

            migrationBuilder.AddColumn<string>(
                name: "LastFiveBets",
                table: "TyperUser",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Leagues",
                table: "TyperUser",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastFiveBets",
                table: "TyperUser");

            migrationBuilder.DropColumn(
                name: "Leagues",
                table: "TyperUser");

            migrationBuilder.CreateTable(
                name: "League",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TyperUserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_League", x => x.Id);
                    table.ForeignKey(
                        name: "FK_League_TyperUser_TyperUserId",
                        column: x => x.TyperUserId,
                        principalTable: "TyperUser",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_League_TyperUserId",
                table: "League",
                column: "TyperUserId");
        }
    }
}
