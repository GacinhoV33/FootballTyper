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
    void Update(int id, UpdateRequest model);
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

        // save user
        _context.TyperUser.Add(user);
        _context.SaveChanges();
    }

    public void Update(int id, UpdateRequest model)
    {
        var user = getUser(id);

        // validate
        if (model.Username != user.Username && _context.TyperUser.Any(x => x.Username == model.Username))
            throw new AppException("Username '" + model.Username + "' is already taken");

        // hash password if it was entered
        if (!string.IsNullOrEmpty(model.Password))
            user.PasswordHash = BCrypt.HashPassword(model.Password);

        // copy model to user and save
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

    // helper methods

    private TyperUser getUser(int id)
    {
        var user = _context.TyperUser.Find(id);
        if (user == null) throw new KeyNotFoundException("User not found");
        return user;
    }
}