using Microsoft.AspNetCore.Mvc;
using MuseumHub.API.DTOs;
using MuseumHub.Core.Entities;
using MuseumHub.Services.Interfaces;

namespace MuseumHub.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExhibitsController : ControllerBase
{
    private readonly IExhibitService _service;

    public ExhibitsController(IExhibitService service) => _service = service;

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ExhibitDto>>> GetAll()
    {
        var items = await _service.GetAllAsync();
        return Ok(items.Select(ToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<ExhibitDto>> GetById(int id)
    {
        var item = await _service.GetByIdAsync(id);
        return item is null ? NotFound() : Ok(ToDto(item));
    }

    [HttpPost]
    public async Task<ActionResult<ExhibitDto>> Create(ExhibitSaveDto dto)
    {
        var created = await _service.CreateAsync(ToEntity(dto));
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, ToDto(created));
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, ExhibitSaveDto dto)
    {
        var ok = await _service.UpdateAsync(id, ToEntity(dto));
        return ok ? NoContent() : NotFound();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var ok = await _service.DeleteAsync(id);
        return ok ? NoContent() : NotFound();
    }

    private static ExhibitDto ToDto(Exhibit e) =>
    new(e.Id, e.Title, e.Description, e.Author, e.Year, e.ImageUrl, e.CreatedAt);

    private static Exhibit ToEntity(ExhibitSaveDto d) => new()
    {
        Title = d.Title,
        Description = d.Description,
        Author = d.Author,
        Year = d.Year,
        ImageUrl = d.ImageUrl
    };
}