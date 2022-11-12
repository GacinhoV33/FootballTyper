using Azure.Storage.Blobs;
using FootballTyperAPI.Data;
using FootballTyperAPI.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace FootballTyperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private IConfiguration _config;
        private readonly FootballTyperAPIContext _context;

        public FileController(IConfiguration config, FootballTyperAPIContext context)
        {
            _config = config;
            _context = context;
        }

        // POST api/<FileController>
        [HttpPost]
        public ActionResult Post([FromForm] FileModel fileModel)
        {
            try
            {
                if (fileModel.File.ContentType.StartsWith("image/") || fileModel.File.ContentType.StartsWith("application/octet-stream"))
                {
                    UploadToBlobStorage(fileModel);

                    return Ok(new { msg = "Profile picture saved successfully" });
                }
                else
                {
                    return BadRequest(new { msg = "Only images are allowed!" });
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        private void UploadToBlobStorage(FileModel fileModel)
        {
            string containerName = "imgs";
            var containerClient = new BlobContainerClient(
                _config.GetConnectionString("FootballTyperStorageAccout"),
                containerName);
            BlobClient blobClient = containerClient.GetBlobClient(fileModel.FileName);
            blobClient.Upload(fileModel.File.OpenReadStream(), true);
        }

        private ActionResult SaveLocally(FileModel fileModel)
        {
            try
            {
                if (fileModel.File.ContentType.StartsWith("image/") || fileModel.File.ContentType.StartsWith("application/octet-stream"))
                {
                    string path = Path.Combine(Directory.GetCurrentDirectory(), "Images/Profile", fileModel.FileName);
                    using (Stream stream = new FileStream(path, FileMode.Create))
                    {
                        fileModel.File.CopyTo(stream);
                    }

                    return Ok(new { msg = "Profile picture saved successfully" });
                }
                else
                {
                    return BadRequest(new { msg = "Only images are allowed!" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        //// PUT api/<FileController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<FileController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}

        //// GET: api/<FileController>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET api/<FileController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}
    }
}
