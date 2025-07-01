using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using CsvHelper;
using System.Globalization;
using System.IO;

namespace Monster_Battler.controllers
{
    [ApiController]
    [Route("[controller]")]

    public class HeroController : ControllerBase
    {
        private readonly ILogger<HeroController> _logger;
        public HeroController(ILogger<HeroController> logger)
        {
            _logger = logger;
        }

        private static readonly object _fileLock = new(); // <--- 🔒 Lock object

        private string filePath = "data/herostats.csv";
        private string tempFilePath = "data/herostats_temp.csv";

        [HttpGet("{HeroName}")]
        public ActionResult GetHeroStats(string HeroName)
        {
            try
            {
                using var reader = new StreamReader(filePath);
                using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
                var records = csv.GetRecords<Hero>().Where(h => h.HeroName == HeroName).ToList();
                return Ok(records);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error reading CSV: {ex.Message}");
            }
        }

        [HttpPut("{HeroName}")]
        public ActionResult UpdateHeroStats(string HeroName, [FromBody] Hero updatedHero)
        {
            lock (_fileLock) // <--- ✅ Lock prevents race condition
            {
                try
                {
                    // STEP 1: Read current data
                    List<Hero> heroes;
                    using (var reader = new StreamReader(filePath))
                    using (var csvReader = new CsvReader(reader, CultureInfo.InvariantCulture))
                    {
                        heroes = csvReader.GetRecords<Hero>().ToList();
                    }

                    // STEP 2: Update in-memory hero
                    bool found = false;
                    for (int i = 0; i < heroes.Count; i++)
                    {
                        if (heroes[i].HeroName == HeroName)
                        {
                            heroes[i] = updatedHero;
                            found = true;
                            break;
                        }
                    }

                    if (!found)
                        return NotFound($"Hero '{HeroName}' not found.");

                    // STEP 3: Write to temp file
                    using (var writer = new StreamWriter(tempFilePath))
                    using (var csvWriter = new CsvWriter(writer, CultureInfo.InvariantCulture))
                    {
                        csvWriter.WriteRecords(heroes);
                    }

                    // STEP 4: Replace original file
                    System.IO.File.Delete(filePath);
                    System.IO.File.Move(tempFilePath, filePath);

                    return Ok(new { message = "Hero updated successfully." });
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Error updating hero: {ex.Message}");
                }
            }
        }
    }

}