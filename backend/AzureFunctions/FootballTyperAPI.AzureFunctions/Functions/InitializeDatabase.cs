using FootballTyperAPI.AzureFunctions;
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
            var result1 = TriggerAfterMatch.Get("api/InitializeTableTeams").GetAwaiter().GetResult();
            var result2 = TriggerAfterMatch.Get("api/InitializeTableMatches").GetAwaiter().GetResult();
            //var result3 = TriggerAfterMatch.Get("api/InitializeTableBets").GetAwaiter().GetResult();

            return new OkObjectResult(new { Ok = true });
        }
    }

}
