using System.ComponentModel.DataAnnotations;

namespace Blend.Cms12.Models;

public class LoginViewModel
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}
