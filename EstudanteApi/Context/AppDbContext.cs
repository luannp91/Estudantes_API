using EstudanteApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EstudanteApi.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Aluno> Estudantes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Aluno>().HasData(
                new Aluno
                {
                    Id = 1,
                    Nome = "Emma DeadPool",
                    Email = "emma@email.com",
                    Idade = 25
                },
                new Aluno
                {
                    Id = 2,
                    Nome = "Johnny B.",
                    Email = "johnny@email.com",
                    Idade = 30
                }
                );
        }
    }
}
