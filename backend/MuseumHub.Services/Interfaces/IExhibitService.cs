using MuseumHub.Core.Entities;

namespace MuseumHub.Services.Interfaces;

public interface IExhibitService
{
    Task<IEnumerable<Exhibit>> GetAllAsync();
    Task<Exhibit?> GetByIdAsync(int id);
    Task<Exhibit> CreateAsync(Exhibit exhibit);
    Task<bool> UpdateAsync(int id, Exhibit exhibit);
    Task<bool> DeleteAsync(int id);
}