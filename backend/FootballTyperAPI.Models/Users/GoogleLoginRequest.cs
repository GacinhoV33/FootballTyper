namespace FootballTyperAPI.Models.Users;

using System.ComponentModel.DataAnnotations;

public class GoogleLoginRequest
{
    [Required]
    public string FullName { get; set; }

    [Required]
    public string Email { get; set; }

    public string? ImgLink { get; set; }

}