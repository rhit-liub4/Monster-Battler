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

    public class MonsterController : ControllerBase
    {
        private readonly ILogger<MonsterController> _logger;
        public MonsterController(ILogger<MonsterController> logger)
        {
            _logger = logger;
        }
        [HttpGet("{portal}")]
        public ActionResult GetAllMonsters(string portal)
        {
            try
            {
                using var reader = new StreamReader("data/monsters.csv");
                using var csv = new CsvReader(reader, CultureInfo.InvariantCulture);
                var records = csv.GetRecords<Monster>().Where(m => m.Portal == portal).ToList();
                return Ok(records);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error reading CSV: {ex.Message}");
            }
        }

    }
}