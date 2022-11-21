using AutoMapper;
using FootballTyperAPI.Common;
using FootballTyperAPI.Data;
using FootballTyperAPI.Models;
using FootballTyperAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace FootballTyperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreController : ControllerBase
    {
        private readonly FootballTyperAPIContext _context;
        private readonly IUserService _userService;
        private IMapper _mapper;

        public ScoreController(FootballTyperAPIContext context,
            IUserService userService, IMapper mapper)
        {
            _context = context;
            _userService = userService; 
            _mapper = mapper;
        }

        // GET: api/Score/LastDay/main
        [HttpGet("LastDay/{league}")]
        public IActionResult GetLastDayRanking(string league)
        {
            var users = _userService.GetAll().Where(x => x.Leagues.Contains(league));
            if (!users.Any())
            {
                //return NotFound(new { msg = $"No users in this league: {league}" });
                return Ok(new List<TyperUserApi>());
            }
            var bets = _context.Bets.ToList();
            ScoreHelper.UpdateData(bets, _context.Matches.ToList());
            var yesterdayAndToday = new int[] { DateTime.Today.DayOfYear - 1};
            var lastDayBets = bets.Where(x => users.Select(y => y.Username).Contains(x.BettorUserName) && yesterdayAndToday.Contains(x.Match.Date.DayOfYear));
            ScoreHelper.CleanUsersData(users);
            if (!lastDayBets.Any())
            {
                var typerUsersApiEmpty = MapTyperUserApiToTyperUser(users);
                var rankingListEmpty = RankingHelper.CreateRanking(typerUsersApiEmpty, startPos: 1);
                //return NotFound(new { msg = $"No bets in this league: {league}" });
                foreach (var user in users)
                {
                    user.PositionDict = rankingListEmpty.First(x => x.User.Id == user.Id).LeaguePosition;
                }
                return Ok(users);
            }
            ScoreHelper.CalculatePointsForEachUser(lastDayBets, users);
            var typerUsersApi = MapTyperUserApiToTyperUser(users);
            var rankingList = RankingHelper.CreateRanking(typerUsersApi, startPos: 1);
            foreach (var user in users)
            {
                user.PositionDict = rankingList.First(x => x.User.Id == user.Id).LeaguePosition;
            }
            ScoreHelper.UpdateLastFiveUserBets(lastDayBets, users);
            return Ok(users);
        }




        // GET: api/Score/Groupstage/main
        [HttpGet("Groupstage/{league}")]
        public IActionResult GetGroupstageRanking(string league)
        {
            var users = _userService.GetAll().Where(x => x.Leagues.Contains(league));
            if (!users.Any())
            {
                //return NotFound(new { msg = $"No users in this league: {league}" });
                return Ok(new List<TyperUserApi>());
            }
            var bets = _context.Bets.ToList();
            ScoreHelper.UpdateData(bets, _context.Matches.ToList());

            var groupStageBets = bets.Where(x => users.Select(y => y.Username).Contains(x.BettorUserName) && x.Match.Stage == Stage.Group);
            ScoreHelper.CleanUsersData(users);
            if (!groupStageBets.Any())
            {
                var typerUsersApiEmpty = MapTyperUserApiToTyperUser(users);
                var rankingListEmpty = RankingHelper.CreateRanking(typerUsersApiEmpty, startPos: 1);
                //return NotFound(new { msg = $"No bets in this league: {league}" });
                foreach (var user in users)
                {
                    user.PositionDict = rankingListEmpty.First(x => x.User.Id == user.Id).LeaguePosition;
                }
                //return NotFound(new { msg = $"No bets in this league: {league}" });
                return Ok(users);
            }
            ScoreHelper.CalculatePointsForEachUser(groupStageBets, users);
            var typerUsersApi = MapTyperUserApiToTyperUser(users);
            var rankingList = RankingHelper.CreateRanking(typerUsersApi, startPos: 1);
            foreach (var user in users)
            {
                user.PositionDict = rankingList.First(x => x.User.Id == user.Id).LeaguePosition;
            }
            ScoreHelper.UpdateLastFiveUserBets(groupStageBets, users);
            return Ok(users);
        }

        // GET: api/Score/Knockout/main
        [HttpGet("Knockout/{league}")]
        public IActionResult GetKnockoutRanking(string league)
        {
            var users = _userService.GetAll().Where(x => x.Leagues.Contains(league));
            if (!users.Any())
            {
                //return NotFound(new { msg = $"No users in this league: {league}" });
                return Ok(new List<TyperUserApi>());
            }
            var bets = _context.Bets.ToList();
            ScoreHelper.UpdateData(bets, _context.Matches.ToList());

            var knockoutBets = bets.Where(x => users.Select(y => y.Username).Contains(x.BettorUserName) && x.Match.Stage > Stage.Group);
            ScoreHelper.CleanUsersData(users);
            if (!knockoutBets.Any())
            {
                var typerUsersApiEmpty = MapTyperUserApiToTyperUser(users);
                var rankingListEmpty = RankingHelper.CreateRanking(typerUsersApiEmpty, startPos: 1);
                //return NotFound(new { msg = $"No bets in this league: {league}" });
                foreach(var user in users)
                {
                    user.PositionDict = rankingListEmpty.First(x => x.User.Id == user.Id).LeaguePosition;
                }
                return Ok(users);
            }
            ScoreHelper.CalculatePointsForEachUser(knockoutBets, users);
            var typerUsersApi = MapTyperUserApiToTyperUser(users);
            var rankingList = RankingHelper.CreateRanking(typerUsersApi, startPos: 1);
            foreach (var user in users)
            {
                user.PositionDict = rankingList.First(x => x.User.Id == user.Id).LeaguePosition;
            }
            ScoreHelper.UpdateLastFiveUserBets(knockoutBets, users);
            return Ok(users);
        }

        private IEnumerable<TyperUser> MapTyperUserApiToTyperUser(IEnumerable<TyperUserApi> users)
        {
            var typerUsers = new List<TyperUser>();
            foreach(var user in users)
            {
                var newTyperUser = new TyperUser();
                newTyperUser.RankStatus = JsonSerializer.Serialize(user.RankStatusDict);
                newTyperUser.PositionStr = JsonSerializer.Serialize(user.PositionDict);
                newTyperUser.LeaguesStr = JsonSerializer.Serialize(user.Leagues);

                var userToMap = _mapper.Map(user, newTyperUser);

                typerUsers.Add(userToMap);

            }
            return typerUsers;
        }

        // GET: api/Score/All/main
        [HttpGet("All/{league}")]
        public IActionResult GetAllMatchesRanking(string league)
        {
            var users = _userService.GetAll().Where(x => x.Leagues.Contains(league));
            if (!users.Any())
            {
                //return NotFound(new { msg = $"No users in this league: {league}" });
                return Ok(new List<TyperUserApi>());
            }
            var bets = _context.Bets.ToList();
            ScoreHelper.UpdateData(bets, _context.Matches.ToList());

            var allLeagueBets = bets.Where(x => users.Select(y => y.Username).Contains(x.BettorUserName));
            ScoreHelper.CleanUsersData(users);
            if (!allLeagueBets.Any())
            {
                //return NotFound(new { msg = $"No bets in this league: {league}" });
                return Ok(users);
            }
            ScoreHelper.CalculatePointsForEachUser(allLeagueBets, users);
            ScoreHelper.UpdateLastFiveUserBets(allLeagueBets, users);
            return Ok(users);
        }

    }
}
