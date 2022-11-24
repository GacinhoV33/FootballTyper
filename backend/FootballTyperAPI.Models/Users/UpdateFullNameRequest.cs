using System.ComponentModel.DataAnnotations;

namespace FootballTyperAPI.Models.Users;

public class UpdateFullNameRequest
{
    [Required]
    public int Id { get; set; }

    [Required]
    public string FullName { get; set; }
}