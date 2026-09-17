using MuseumHub.Core.Entities;

namespace MuseumHub.Core.Interfaces;

public interface IExhibitRepository
{
    Task<IEnumerable<Exhibit>> GetAllAsync();
    Task<Exhibit?> GetByIdAsync(int id);
    Task<Exhibit> AddAsync(Exhibit exhibit);
    Task UpdateAsync(Exhibit exhibit);
    Task DeleteAsync(int id);
}