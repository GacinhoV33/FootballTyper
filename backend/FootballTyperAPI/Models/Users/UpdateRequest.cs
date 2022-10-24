using System.ComponentModel.DataAnnotations;

namespace FootballTyperAPI.Models.Users;

public class UpdateRequest
{
    [Required]
    public string FullName { get; set; }
    //public string LastName { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string Email { get; set; }
}