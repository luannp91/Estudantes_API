using Microsoft.EntityFrameworkCore.Migrations;

namespace EstudanteApi.Migrations
{
    public partial class Inicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Estudantes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(type: "nvarchar(80)", maxLength: 80, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Idade = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estudantes", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Estudantes",
                columns: new[] { "Id", "Email", "Idade", "Nome" },
                values: new object[] { 1, "emma@email.com", 25, "Emma DeadPool" });

            migrationBuilder.InsertData(
                table: "Estudantes",
                columns: new[] { "Id", "Email", "Idade", "Nome" },
                values: new object[] { 2, "johnny@email.com", 30, "Johnny B." });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Estudantes");
        }
    }
}
