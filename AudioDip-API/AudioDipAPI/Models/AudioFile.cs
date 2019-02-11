using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AudioDipAPI.Models
{
    public class AudioFile
    {
        public int Id { get; set; }
        public int UserId { get; set; }

        public string Username { get; set; }

        [Required]
        [StringLength(255)]
        public string FileName { get; set; }
        [Required]
        [StringLength(255)]
        public string Title { get; set; }
    }
}
