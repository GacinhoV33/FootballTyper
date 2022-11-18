using FootballTyperAPI.Common;
using FootballTyperAPI.Data;
using FootballTyperAPI.Models;
using FootballTyperAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FootballTyperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreController : ControllerBase
    {
        private readonly FootballTyperAPIContext _context;
        private readonly IUserService _userService;

        public ScoreController(FootballTyperAPIContext context,
            IUserService userService)
        {
            _context = context;
            _userService = userService;
        }

        // GET: api/Score/LastDay/main
        [HttpGet("LastDay/{league}")]
        public IActionResult GetLastDayRanking(string league)
        {
            var users = _userService.GetAll().Where(x => x.Leagues.Contains(league));
            if (!users.Any())
            {
                return NotFound(new { msg = $"No users in this league: {league}" });
            }
            var bets = _context.Bets.ToList();
            ScoreHelper.UpdateData(bets, _context.Matches.ToList());
            var yesterdayAndToday = new int[] { DateTime.Today.DayOfYear - 1, DateTime.Today.DayOfYear };
            var lastDayBets = bets.Where(x => users.Select(y => y.Username).Contains(x.BettorUserName) && yesterdayAndToday.Contains(x.Match.Date.DayOfYear));
            if (!lastDayBets.Any())
            {
                //return NotFound(new { msg = $"No bets in this league: {league}" });
                return Ok(users);
            }
            ScoreHelper.CleanUsersData(users);
            ScoreHelper.CalculatePointsForEachUser(lastDayBets, users);
            ScoreHelper.UpdateLastFiveUserBets(lastDayBets, users);
            return Ok(users);
        }




        // GET: api/Score/Groupstage/main
        [HttpGet("Groupstage/{league}")]
        public IActionResult GetGroupstageRanking(string league)
        {
            var users = _userService.GetAll().Where(x => x.Leagues.Contains(league));
            var bets = _context.Bets.ToList();
            ScoreHelper.UpdateData(bets, _context.Matches.ToList());

            var groupStageBets = bets.Where(x => users.Select(y => y.Username).Contains(x.BettorUserName) && x.Match.Stage == Stage.Group);
            if (!groupStageBets.Any())
            {
                //return NotFound(new { msg = $"No bets in this league: {league}" });
                return Ok(users);
            }
            ScoreHelper.CleanUsersData(users);
            ScoreHelper.CalculatePointsForEachUser(groupStageBets, users);
            ScoreHelper.UpdateLastFiveUserBets(groupStageBets, users);
            return Ok(users);
        }

        // GET: api/Score/Knockout/main
        [HttpGet("Knockout/{league}")]
        public IActionResult GetKnockoutRanking(string league)
        {
            var users = _userService.GetAll().Where(x => x.Leagues.Contains(league));
            var bets = _context.Bets.ToList();
            ScoreHelper.UpdateData(bets, _context.Matches.ToList());

            var knockoutBets = bets.Where(x => users.Select(y => y.Username).Contains(x.BettorUserName) && x.Match.Stage > Stage.Group);
            if (!knockoutBets.Any())
            {
                //return NotFound(new { msg = $"No bets in this league: {league}" });
                return Ok(users);
            }
            ScoreHelper.CleanUsersData(users);
            ScoreHelper.CalculatePointsForEachUser(knockoutBets, users);
            ScoreHelper.UpdateLastFiveUserBets(knockoutBets, users);
            return Ok(users);
        }

        // GET: api/Score/All/main
        [HttpGet("All/{league}")]
        public IActionResult GetAllMatchesRanking(string league)
        {
            var users = _userService.GetAll().Where(x => x.Leagues.Contains(league));
            var bets = _context.Bets.ToList();
            ScoreHelper.UpdateData(bets, _context.Matches.ToList());

            var allLeagueMatches = bets.Where(x => users.Select(y => y.Username).Contains(x.BettorUserName));
            if (!allLeagueMatches.Any())
            {
                //return NotFound(new { msg = $"No bets in this league: {league}" });
                return Ok(users);
            }
            ScoreHelper.CleanUsersData(users);
            ScoreHelper.CalculatePointsForEachUser(allLeagueMatches, users);
            ScoreHelper.UpdateLastFiveUserBets(allLeagueMatches, users);
            return Ok(users);
        }

    }
}
