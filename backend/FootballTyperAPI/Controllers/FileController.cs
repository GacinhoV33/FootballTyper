using Azure.Storage.Blobs;
using FootballTyperAPI.Data;
using FootballTyperAPI.Models;
using Microsoft.AspNetCore.Mvc;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using Encoder = System.Drawing.Imaging.Encoder;

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
                    using (Image img = Image.FromStream(fileModel.File.OpenReadStream()))
                    {
                        Bitmap resizedImage = CalcDimAndResizeImage(img);

                        using (MemoryStream memoryStream = new MemoryStream())
                        {
                            SetupStream(resizedImage, memoryStream);
                            UploadToBlobStorage(fileModel, memoryStream);
                        }
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

        private Bitmap CalcDimAndResizeImage(Image img)
        {
            var maxDim = img.Height > img.Width ? img.Height : img.Width;
            float ratio = (float)maxDim / 320;
            Bitmap resultImage = ResizeImg(img, (int)(img.Width / ratio), (int)(img.Height / ratio));
            return resultImage;
        }

        private void SetupStream(Bitmap resultImage, MemoryStream memoryStream)
        {
            ImageCodecInfo myImageCodecInfo = GetEncoderInfo("image/jpeg");
            var myEncoder = Encoder.Quality;
            var myEncoderParameter = new EncoderParameter(myEncoder, 25L);
            var myEncoderParameters = new EncoderParameters(1);
            myEncoderParameters.Param[0] = myEncoderParameter;
            resultImage.Save(memoryStream, myImageCodecInfo, myEncoderParameters);
            memoryStream.Position = 0;
        }

        private void UploadToBlobStorage(FileModel fileModel, MemoryStream img)
        {
            string containerName = "imgs";
            var containerClient = new BlobContainerClient(
                _config.GetConnectionString("FootballTyperStorageAccout"),
                containerName);
            BlobClient blobClient = containerClient.GetBlobClient(fileModel.FileName.Split("/").LastOrDefault());
            blobClient.Upload(img, true);
        }

        private Bitmap ResizeImg(Image image, int width, int height)
        {

            var dest_Rect = new Rectangle(0, 0, width, height);
            var dest_Image = new Bitmap(width, height);

            dest_Image.SetResolution(image.HorizontalResolution, image.VerticalResolution);

            using (var graphics = Graphics.FromImage(dest_Image))
            {
                graphics.CompositingMode = CompositingMode.SourceCopy;
                graphics.CompositingQuality = CompositingQuality.HighQuality;
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.SmoothingMode = SmoothingMode.HighQuality;
                graphics.PixelOffsetMode = PixelOffsetMode.HighQuality;

                using (var wrapMode = new ImageAttributes())
                {
                    wrapMode.SetWrapMode(WrapMode.TileFlipXY);
                    graphics.DrawImage(image, dest_Rect, 0, 0, image.Width, image.Height, GraphicsUnit.Pixel, wrapMode);
                }
            }
            return dest_Image;
        }

        private ImageCodecInfo GetEncoderInfo(String mimeType)
        {
            ImageCodecInfo[] encoders;
            encoders = ImageCodecInfo.GetImageEncoders();
            return encoders.Where(x => x.MimeType == mimeType).First();
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
    }
}
