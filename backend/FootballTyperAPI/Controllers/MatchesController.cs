using FootballTyperAPI.Data;
using FootballTyperAPI.Helpers;
using FootballTyperAPI.Models;
using FootballTyperAPI.Models.Api;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FootballTyperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly FootballTyperAPIContext _context;

        public MatchesController(FootballTyperAPIContext context)
        {
            _context = context;
        }

        // GET: api/Matches
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Match>>> GetMatch()
        {
            return await _context.Matches.ToListAsync();
        }

        // GET: api/Matches/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Match>> GetMatch(int id)
        {
            var match = await _context.Matches.FindAsync(id);

            if (match == null)
            {
                return NotFound();
            }

            return match;
        }

        // PUT: api/Matches/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMatch(int id, Match match)
        {
            if (id != match.Id)
            {
                return BadRequest();
            }

            _context.Entry(match).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatchExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Matches
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Match>> PostMatch(Match match)
        {
            _context.Matches.Add(match);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMatch", new { id = match.Id }, match);
        }

        // DELETE: api/Matches/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMatch(int id)
        {
            var match = await _context.Matches.FindAsync(id);
            if (match == null)
            {
                return NotFound();
            }

            _context.Matches.Remove(match);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MatchExists(int id)
        {
            return _context.Matches.Any(e => e.Id == id);
        }

        // GET: api/Matches/FromFixture
        [HttpGet("FromFixture")]
        public IEnumerable<MatchJSON> GetMatchesFromFixture()
        {
            return MatchHelper.GetAllMatchesJSON();
        }


        // GET: api/Matches/Group
        [HttpGet("Group")]
        public async Task<ActionResult<List<MatchApi>>> GetGroupMatches()
        {
            var groupMatches = await _context.GetAllGroupMatches();

            if (groupMatches == null)
            {
                return NotFound();
            }

            return groupMatches.Select(m => MapMatch(m, "group")).ToList();
        }

        // GET: api/Matches/Knockout
        [HttpGet("Knockout")]
        public async Task<ActionResult<List<MatchApi>>> GetKnockoutMatches()
        {
            var groupMatches = await _context.GetAllKnockoutMatches();

            if (groupMatches == null)
            {
                return NotFound();
            }

            return groupMatches.Select(m => MapMatch(m, "knockout")).ToList();
        }

        private MatchApi MapMatch(Match match, string stage)
        {
            return new MatchApi()
            {
                HomeTeam = match.HomeTeam?.Name,
                AwayTeam = match.AwayTeam?.Name,
                HomeTeamScore = match.HomeTeamScore,
                AwayTeamScore = match.AwayTeamScore,
                Group = match.Group?.Replace("Group ", ""),
                Stadium = match.Location,
                Date = match.Date,
                Referee = match.Referee,
                Stage = stage
            };
        }
    }
}