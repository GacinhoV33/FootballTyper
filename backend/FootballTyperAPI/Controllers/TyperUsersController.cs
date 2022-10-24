using AutoMapper;
using FootballTyperAPI.Authorization;
using FootballTyperAPI.Helpers;
using FootballTyperAPI.Models.Users;
using FootballTyperAPI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace FootballTyperAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TyperUsersController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public TyperUsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model)
        {
            var response = _userService.Authenticate(model);
            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register(RegisterRequest model)
        {
            _userService.Register(model);
            return Ok(new { message = "Registration successful" });
        }

        //[AllowAnonymous]
        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            return Ok(users);
        }


        //[AllowAnonymous]
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            return Ok(user);
        }


        //[AllowAnonymous]
        [HttpPut("{id}")]
        public IActionResult Update(int id, UpdateRequest model)
        {
            _userService.Update(id, model);
            return Ok(new { message = "User updated successfully" });
        }


        //[AllowAnonymous]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok(new { message = "User deleted successfully" });
        }

        //private readonly FootballTyperAPIContext _context;

        //public TyperUsersController(FootballTyperAPIContext context)
        //{
        //    _context = context;
        //}

        //// GET: api/TyperUsers
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<TyperUser>>> GetTyperUser()
        //{
        //    return await _context.TyperUser.ToListAsync();
        //}

        //// GET: api/TyperUsers/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<TyperUser>> GetTyperUser(int id)
        //{
        //    var typerUser = await _context.TyperUser.FindAsync(id);

        //    if (typerUser == null)
        //    {
        //        return NotFound();
        //    }

        //    return typerUser;
        //}

        //// PUT: api/TyperUsers/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutTyperUser(int id, TyperUser typerUser)
        //{
        //    if (id != typerUser.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(typerUser).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TyperUserExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/TyperUsers
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<TyperUser>> PostTyperUser(TyperUser typerUser)
        //{
        //    _context.TyperUser.Add(typerUser);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetTyperUser", new { id = typerUser.Id }, typerUser);
        //}

        //// DELETE: api/TyperUsers/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteTyperUser(int id)
        //{
        //    var typerUser = await _context.TyperUser.FindAsync(id);
        //    if (typerUser == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.TyperUser.Remove(typerUser);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool TyperUserExists(int id)
        //{
        //    return _context.TyperUser.Any(e => e.Id == id);
        //}
    }
}
