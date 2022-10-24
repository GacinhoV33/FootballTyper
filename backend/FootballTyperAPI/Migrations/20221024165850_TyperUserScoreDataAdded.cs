using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballTyperAPI.Migrations
{
    public partial class TyperUserScoreDataAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "TyperUser",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "TyperUser",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "ImgLink",
                table: "TyperUser",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TotalCorrectWinnerBets",
                table: "TyperUser",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalExactScoreBets",
                table: "TyperUser",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalPoints",
                table: "TyperUser",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TotalWrongBets",
                table: "TyperUser",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "League");

            migrationBuilder.DropColumn(
                name: "ImgLink",
                table: "TyperUser");

            migrationBuilder.DropColumn(
                name: "TotalCorrectWinnerBets",
                table: "TyperUser");

            migrationBuilder.DropColumn(
                name: "TotalExactScoreBets",
                table: "TyperUser");

            migrationBuilder.DropColumn(
                name: "TotalPoints",
                table: "TyperUser");

            migrationBuilder.DropColumn(
                name: "TotalWrongBets",
                table: "TyperUser");

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "TyperUser",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "TyperUser",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
