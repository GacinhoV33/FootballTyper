using System.ComponentModel.DataAnnotations;

namespace FootballTyperAPI.Models.Users;

public class UpdateImgLinkRequest
{
    //[Required]
    public string Username { get; set; }
    public string ImgLink { get; set; }
}