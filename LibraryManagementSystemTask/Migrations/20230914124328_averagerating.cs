using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace LibraryManagementSystemTask.Migrations
{
    public partial class averagerating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BookratingValue",
                table: "booksratings",
                newName: "BookAverageRating");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "BookAverageRating",
                table: "booksratings",
                newName: "BookratingValue");
        }
    }
}
