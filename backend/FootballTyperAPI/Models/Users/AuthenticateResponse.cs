namespace FootballTyperAPI.Models.Users;

public class AuthenticateResponse
{
    public int Id { get; set; }
    public string FullName { get; set; }
    //public string LastName { get; set; }
    public string Username { get; set; }
    public string Token { get; set; }
}