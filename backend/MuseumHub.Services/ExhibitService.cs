using MuseumHub.Core.Entities;
using MuseumHub.Core.Interfaces;
using MuseumHub.Services.Interfaces;

namespace MuseumHub.Services;

public class ExhibitService : IExhibitService
{
    private readonly IExhibitRepository _repo;

    public ExhibitService(IExhibitRepository repo) => _repo = repo;

    public Task<IEnumerable<Exhibit>> GetAllAsync() => _repo.GetAllAsync();

    public Task<Exhibit?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);

    public Task<Exhibit> CreateAsync(Exhibit exhibit) => _repo.AddAsync(exhibit);

    public async Task<bool> UpdateAsync(int id, Exhibit exhibit)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing is null) return false;

        existing.Title = exhibit.Title;
        existing.Description = exhibit.Description;
        existing.Author = exhibit.Author;
        existing.Year = exhibit.Year;
        existing.ImageUrl = exhibit.ImageUrl;

        await _repo.UpdateAsync(existing);
        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var existing = await _repo.GetByIdAsync(id);
        if (existing is null) return false;

        await _repo.DeleteAsync(id);
        return true;
    }
}