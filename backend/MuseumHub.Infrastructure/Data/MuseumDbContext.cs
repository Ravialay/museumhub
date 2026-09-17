using Microsoft.EntityFrameworkCore;
using MuseumHub.Core.Entities;

namespace MuseumHub.Infrastructure.Data;

public class MuseumDbContext : DbContext
{
    public MuseumDbContext(DbContextOptions<MuseumDbContext> options) : base(options) { }

    public DbSet<Exhibit> Exhibits => Set<Exhibit>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Exhibit>(e =>
        {
            e.Property(x => x.Title).HasMaxLength(200).IsRequired();
            e.Property(x => x.Author).HasMaxLength(150);
        });
    }
}