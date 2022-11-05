using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;

namespace Company.Function
{
    public static class CleanTableMatches
    {
        [FunctionName("CleanTableMatches")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "CleanTableMatches")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"-------------------------------------------------------------------------");
            log.LogInformation($"Execution date: {DateTime.Now}");
            log.LogInformation($"Starting execution of: CleanTableMatches");

            var deleteBets = "DELETE FROM Match";
            CleanDatabase.ExecuteCommand(deleteBets, log);

            log.LogInformation($"Ending execution of: CleanTableMatches");
            log.LogInformation($"-------------------------------------------------------------------------");
            return new OkObjectResult(new { Ok = true });
        }
    }
}
