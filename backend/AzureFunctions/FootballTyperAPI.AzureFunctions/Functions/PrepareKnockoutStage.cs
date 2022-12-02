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
            var result2 = HttpRequestHelper.Get("api/BetAllMatches");
            var result3 = HttpRequestHelper.Get("api/PlayAllGroupMatches");
            var result4 = HttpRequestHelper.Get("api/UpdateScoreAfterMatch");
            var result5 = HttpRequestHelper.Get("api/UpdateTyperScores");

            //var result6 = HttpRequestHelper.Get("api/InitializeKnockoutStageEightfinals");
            //var result7 = HttpRequestHelper.Get("api/BetFiveMatches");
            //var result7_2 = HttpRequestHelper.Get("api/BetFiveMatches");
            //var result8 = HttpRequestHelper.Get("api/PlayKnockoutStageEightfinals");
            //var result9 = HttpRequestHelper.Get("api/UpdateScoreAfterMatch");
            //var result10 = HttpRequestHelper.Get("api/UpdateTyperScores");

            //var result11 = HttpRequestHelper.Get("api/InitializeKnockoutStageQuarterfinals");
            //var result12 = HttpRequestHelper.Get("api/BetFiveMatches");
            //var result13 = HttpRequestHelper.Get("api/PlayKnockoutStageQuarterfinals");
            //var result14 = HttpRequestHelper.Get("api/UpdateScoreAfterMatch");
            //var result15 = HttpRequestHelper.Get("api/UpdateTyperScores");

            //var result16 = HttpRequestHelper.Get("api/InitializeKnockoutStageSemifinals");
            //var result17 = HttpRequestHelper.Get("api/BetFiveMatches");
            //var result18 = HttpRequestHelper.Get("api/PlayKnockoutStageSemifinals");
            //var result19 = HttpRequestHelper.Get("api/UpdateScoreAfterMatch");
            //var result20 = HttpRequestHelper.Get("api/UpdateTyperScores");

            //var result21 = HttpRequestHelper.Get("api/InitializeKnockoutStageFinals");
            //var result22 = HttpRequestHelper.Get("api/BetFiveMatches");
            //var result23 = HttpRequestHelper.Get("api/PlayKnockoutStageFinals");
            //var result24 = HttpRequestHelper.Get("api/UpdateScoreAfterMatch");
            //var result25 = HttpRequestHelper.Get("api/UpdateTyperScores");

            return new OkObjectResult(new { Ok = true });
        }
    }
}
