using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AudioDipAPI.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        [EmailAddress]

        public string Email { get; set; }
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 4, ErrorMessage = "You must specify a password more than 4 characters")]
        public string Password { get; set; }
    }
}
