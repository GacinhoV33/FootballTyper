using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FootballTyperAPI.Migrations
{
    public partial class TyperUserAuthenticationRegistrationETC : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "TyperUser",
                newName: "Username");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "TyperUser",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "TyperUser",
                newName: "FullName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Username",
                table: "TyperUser",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "TyperUser",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "FullName",
                table: "TyperUser",
                newName: "Address");
        }
    }
}
