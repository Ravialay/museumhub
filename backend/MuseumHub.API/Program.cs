using Microsoft.EntityFrameworkCore;
using MuseumHub.Core.Interfaces;
using MuseumHub.Infrastructure.Data;
using MuseumHub.Infrastructure.Repositories;
using MuseumHub.Services;
using MuseumHub.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Подключение к PostgreSQL
builder.Services.AddDbContext<MuseumDbContext>(opt =>
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Регистрация зависимостей
builder.Services.AddScoped<IExhibitRepository, ExhibitRepository>();
builder.Services.AddScoped<IExhibitService, ExhibitService>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS — для React с другого порта
builder.Services.AddCors(o => o.AddPolicy("frontend", p =>
    p.WithOrigins("http://localhost:5173")
     .AllowAnyHeader()
     .AllowAnyMethod()));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("frontend");
app.UseAuthorization();
app.MapControllers();

// Автоматически применяем миграции при старте (для dev)
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MuseumDbContext>();
    db.Database.Migrate();
}

app.Run();