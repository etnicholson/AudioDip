using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AudioDipAPI.Data;
using AudioDipAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AudioDipAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FileController : ControllerBase
    {
        private readonly string[] ACCEPTED_FILE_TYPES = new[] { ".wav", ".mp3" };
        private readonly IHostingEnvironment _host;
        private readonly ApplicationDbContext _context;

        public FileController(IHostingEnvironment host, ApplicationDbContext context)
        {
            _host = host;
            _context = context;
        }



        [HttpGet]
        [Route("userFiles/{userId}")]
        public ActionResult<IEnumerable<AudioFile>> UserFiles(int userId)
        {

            var files = _context.AudioFiles.Where<AudioFile>(p => p.UserId == userId).ToList();

            return files;
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("getaudio/{id}")]
        public ActionResult<AudioFile> GetAudio(int id)
        {

            var file = _context.AudioFiles.FirstOrDefault<AudioFile>(p => p.Id == id);

            return file;
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Upload([FromForm(Name = "audio")] IFormFile formData, [FromForm(Name = "filename")] string title, [FromForm(Name = "id")] int userId)
        {


            if (formData == null) return BadRequest("Null File");
            if (formData.Length == 0)
            {
                return BadRequest("Empty File");
            }
            //if (filesData.Length > 10 * 1024 * 1024) return BadRequest("Max file size exceeded.");
            if (!ACCEPTED_FILE_TYPES.Any(s => s == Path.GetExtension(formData.FileName).ToLower())) return BadRequest("Invalid file type.");
            var uploadFilesPath = Path.Combine(_host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadFilesPath))
                Directory.CreateDirectory(uploadFilesPath);
            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(formData.FileName);
            var filePath = Path.Combine(uploadFilesPath, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await formData.CopyToAsync(stream);
            }
            var audio = new AudioFile { FileName = fileName, Title = title, UserId = userId };
            _context.AudioFiles.Add(audio);
            await _context.SaveChangesAsync();
            return Ok();
        }


        [HttpDelete]
        [Route("Delete/{id}")]

        public async Task<IActionResult> Delete(int id)
        {

            if(id == 0) return BadRequest("No file found");

            var audioToRemove =  _context.AudioFiles.FirstOrDefault<AudioFile>(p => p.Id == id);
            _context.AudioFiles.Remove(audioToRemove);
            var uploadFilesPath = Path.Combine(_host.WebRootPath, "uploads");
            var filePath = Path.Combine(uploadFilesPath, audioToRemove.FileName);
            System.IO.File.Delete(filePath);


            await _context.SaveChangesAsync();


            return Ok();
        }


    }
}