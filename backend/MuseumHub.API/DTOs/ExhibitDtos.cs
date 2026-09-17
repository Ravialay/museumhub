namespace MuseumHub.API.DTOs;

public record ExhibitDto(
    int Id,
    string Title,
    string Description,
    string Author,
    int Year,
    string? ImageUrl,
    DateTime CreatedAt);

public record ExhibitSaveDto(
    string Title,
    string Description,
    string Author,
    int Year,
    string? ImageUrl);