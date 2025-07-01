using CsvHelper;
using System.Globalization;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// app.MapGet("/api/monsters/{portal}", (string portal) => {
//     using var reader = new StreamReader("Data/monsters.csv");
//     using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
//     var records = csv.GetRecords<Monster>();
//     return records.Where(m => m.Portal == portal).ToList();

// });

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDevClient",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngularDevClient");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(builder => builder
     .AllowAnyMethod()
     .AllowAnyHeader()
     .AllowAnyOrigin()
);

app.Run();