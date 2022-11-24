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
            var registeredUser = _userService.GetByUsername(model.Username);
            return Ok(new { message = "Registration successful", userId = registeredUser.Id });
        }

        [AllowAnonymous]
        [HttpPost("googleLogin")]
        public IActionResult GoogleLogin(GoogleLoginRequest model)
        {
            var response = _userService.GoogleLogin(model);
            return Ok(response);
        }

        [AllowAnonymous]
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
        [HttpPut("Password/{id}")]
        public IActionResult UpdatePassword(int id, UpdateRequest model)
        {
            _userService.UpdatePassword(id, model);
            return Ok(new { message = "User updated successfully" });
        }


        //[AllowAnonymous]
        [HttpPut("ImgLink/{id}")]
        public IActionResult UpdateImgLink(int id, [FromBody] UpdateImgLinkRequest model)
        {
            _userService.UpdateImgLink(id, model);
            return Ok(new { message = "User updated successfully" });
        }

        //[AllowAnonymous]
        [HttpPut("FullName/{id}")]
        public IActionResult UpdateFullName(int id, [FromBody] UpdateFullNameRequest model)
        {
            _userService.UpdateFullName(id, model);
            return Ok(new { message = "User updated successfully" });
        }


        //[AllowAnonymous]
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok(new { message = "User deleted successfully" });
        }
    }
}
