using Microsoft.EntityFrameworkCore;
using MuseumHub.Core.Entities;
using MuseumHub.Core.Interfaces;
using MuseumHub.Infrastructure.Data;

namespace MuseumHub.Infrastructure.Repositories;

public class ExhibitRepository : IExhibitRepository
{
    private readonly MuseumDbContext _context;
    public ExhibitRepository(MuseumDbContext context) => _context = context;

    public async Task<IEnumerable<Exhibit>> GetAllAsync() =>
        await _context.Exhibits.AsNoTracking().OrderBy(e => e.Title).ToListAsync();

    public async Task<Exhibit?> GetByIdAsync(int id) =>
        await _context.Exhibits.FindAsync(id);

    public async Task<Exhibit> AddAsync(Exhibit exhibit)
    {
        _context.Exhibits.Add(exhibit);
        await _context.SaveChangesAsync();
        return exhibit;
    }

    public async Task UpdateAsync(Exhibit exhibit)
    {
        _context.Exhibits.Update(exhibit);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var e = await _context.Exhibits.FindAsync(id);
        if (e is null) return;
        _context.Exhibits.Remove(e);
        await _context.SaveChangesAsync();
    }
}