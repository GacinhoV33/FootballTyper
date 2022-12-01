using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FootballTyperAPI.Common;

namespace FootballTyperAPI.AzureFunctions.Functions
{
    public static class PrepareKnockoutStage
    {
        [FunctionName("PrepareKnockoutStage")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "PrepareKnockoutStage")] HttpRequest req,
            ILogger log)
        {

            var result0 = HttpRequestHelper.Get("api/CleanDatabase");
            var result01 = HttpRequestHelper.Get("api/ResetTyperScores");
            var result1 = HttpRequestHelper.Get("api/InitializeDatabase");
            //var result2 = HttpRequestHelper.Get("api/BetAllMatches");
            var result3 = HttpRequestHelper.Get("api/PlayAllGroupMatches");
            var result4 = HttpRequestHelper.Get("api/UpdateScoreAfterMatch");
            var result5 = HttpRequestHelper.Get("api/UpdateTyperScores");
            var result6 = HttpRequestHelper.Get("api/InitializeKnockoutStageEightfinals");
            return new OkObjectResult(new { Ok = true });
        }
    }
}
