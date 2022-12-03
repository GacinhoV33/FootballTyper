using FootballTyperAPI.AzureFunctions;
using FootballTyperAPI.Common;
using FootballTyperAPI.Helpers;
using FootballTyperAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace Company.Function
{
    public static class InitializeDatabase
    {
        [FunctionName("InitializeDatabase")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "InitializeDatabase")] HttpRequest req,
            ILogger log)
        {
            var result1 = HttpRequestHelper.Get("api/InitializeTableTeams");
            var result2 = HttpRequestHelper.Get("api/InitializeTableMatches");
            //var result3 = HttpRequestHelper.Get("api/InitializeTableBets");

            return new OkObjectResult(new { Ok = true });
        }
    }

}
