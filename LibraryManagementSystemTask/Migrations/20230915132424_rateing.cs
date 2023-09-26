using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryManagementSystemTask.Migrations
{
    public partial class rateing : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BookAverageRating",
                table: "booksratings");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "BookAverageRating",
                table: "booksratings",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
