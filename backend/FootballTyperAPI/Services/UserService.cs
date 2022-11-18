namespace FootballTyperAPI.Services;

using AutoMapper;
using BCrypt.Net;
using FootballTyperAPI.Authorization;
using FootballTyperAPI.Data;
using FootballTyperAPI.Helpers;
using FootballTyperAPI.Models;
using FootballTyperAPI.Models.Users;
using System.Text.Json;
public interface IUserService
{
    AuthenticateResponse Authenticate(AuthenticateRequest model);
    IEnumerable<TyperUserApi> GetAll();
    TyperUser GetById(int id);
    TyperUserApi GetByUsername(string username);
    void Register(RegisterRequest model);
    GoogleLoginResponse GoogleLogin(GoogleLoginRequest model);
    void UpdatePassword(int id, UpdateRequest model);
    void UpdateImgLink(int id, UpdateImgLinkRequest model);
    void UpdateFullName(int id, UpdateFullNameRequest model);
    void Delete(int id);
}

public class UserService : IUserService
{
    private FootballTyperAPIContext _context;
    private IJwtUtils _jwtUtils;
    private readonly IMapper _mapper;

    public UserService(
        FootballTyperAPIContext context,
        IJwtUtils jwtUtils,
        IMapper mapper)
    {
        _context = context;
        _jwtUtils = jwtUtils;
        _mapper = mapper;
    }

    public AuthenticateResponse Authenticate(AuthenticateRequest model)
    {
        var user = _context.TyperUser.SingleOrDefault(x => x.Username == model.Username || x.Email == model.Username);

        // validate
        if (user == null || !BCrypt.Verify(model.Password, user.PasswordHash))
            throw new AppException("Username or password is incorrect");

        // authentication successful
        var response = _mapper.Map<AuthenticateResponse>(user);
        response.Token = _jwtUtils.GenerateToken(user);
        return response;
    }

    public IEnumerable<TyperUserApi> GetAll()
    {
        var typerUsers = new List<TyperUserApi>();
        foreach (var user in _context.TyperUser)
        {
            var typerUserApi = _mapper.Map(user, new TyperUserApi());
            if (user.RankStatus != null)
            {
                typerUserApi.RankStatusDict = JsonSerializer.Deserialize<Dictionary<string, int>>(user.RankStatus);
            }
            if (user.LeaguesStr != null)
            {
                typerUserApi.Leagues = JsonSerializer.Deserialize<string[]>(user.LeaguesStr);
            }
            if (user.PositionStr != null)
            {
                typerUserApi.PositionDict = JsonSerializer.Deserialize<Dictionary<string, int>>(user.PositionStr);
            }
            typerUsers.Add(typerUserApi);
        }
        return typerUsers;
    }

    public TyperUser GetById(int id)
    {
        return getUser(id);
    }

    public TyperUserApi GetByUsername(string username)
    {
        var user = GetAll().FirstOrDefault(x => x.Username == username);
        if (user == null) throw new KeyNotFoundException("User not found");
        return user;
    }

    public void Register(RegisterRequest model)
    {
        // validate
        if (_context.TyperUser.Any(x => x.Username == model.Username))
            throw new AppException("Username '" + model.Username + "' is already taken!");

        if (_context.TyperUser.Any(x => x.Email == model.Email))
            throw new AppException("For email: '" + model.Email + "' account is already created!");

        // map model to new user object
        var user = _mapper.Map<TyperUser>(model);

        // hash password
        user.PasswordHash = BCrypt.HashPassword(model.Password);

        user.LeaguesStr = "[\"main\"]";
        user.PositionStr = "{\"main\":100}";
        user.RankStatus = "{\"main\":0}";

        // save user
        _context.TyperUser.Add(user);
        _context.SaveChanges();
    }

    public GoogleLoginResponse GoogleLogin(GoogleLoginRequest model)
    {
        var user = _context.TyperUser.Where(x => x.Email == model.Email).FirstOrDefault();
        if (user == null)
        {
            user = _mapper.Map<TyperUser>(model);

            user.Username = model.Email.Split("@").First();
            user.PasswordHash = "$2a$11$k4t7IrJ2ffsFNK2Sh0/nveZbPPI1/oYgnls.0O9LHcy0hIDt03Ya2";
            user.LeaguesStr = "[\"main\"]";

            _context.TyperUser.Add(user);
            _context.SaveChanges();
        }

        return new GoogleLoginResponse { user = user, userToken = _jwtUtils.GenerateToken(user) };
    }

    public void UpdatePassword(int id, UpdateRequest model)
    {
        var user = getUser(id);

        if (model.Username != user.Username && _context.TyperUser.Any(x => x.Username == model.Username))
            throw new AppException("Username '" + model.Username + "' is already taken");

        if (!string.IsNullOrEmpty(model.Password))
            user.PasswordHash = BCrypt.HashPassword(model.Password);

        _mapper.Map(model, user);
        _context.TyperUser.Update(user);
        _context.SaveChanges();
    }

    public void UpdateImgLink(int id, UpdateImgLinkRequest model)
    {
        var user = getUser(id);

        if (model.Username != user.Username && _context.TyperUser.Any(x => x.Username == model.Username))
            throw new AppException("There is no user: '" + model.Username);

        _mapper.Map(model, user);
        _context.TyperUser.Update(user);
        _context.SaveChanges();
    }

    public void UpdateFullName(int id, UpdateFullNameRequest model)
    {
        var user = getUser(id);

        _mapper.Map(model, user);
        _context.TyperUser.Update(user);
        _context.SaveChanges();
    }

    public void Delete(int id)
    {
        var user = getUser(id);
        _context.TyperUser.Remove(user);
        _context.SaveChanges();
    }

    private TyperUser getUser(int id)
    {
        var user = _context.TyperUser.Find(id);
        if (user == null) throw new KeyNotFoundException("User not found");
        return user;
    }
}