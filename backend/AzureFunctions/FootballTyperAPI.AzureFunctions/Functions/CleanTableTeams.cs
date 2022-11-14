using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;

namespace Company.Function
{
    public static class CleanTableTeams
    {
        [FunctionName("CleanTableTeams")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "CleanTableTeams")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"-------------------------------------------------------------------------");
            log.LogInformation($"Execution date: {DateTime.Now}");
            log.LogInformation($"Starting execution of: CleanTableTeams");

            var deleteBets = "DELETE FROM Teams";
            CleanDatabase.ExecuteCommand(deleteBets, log);

            log.LogInformation($"Ending execution of: CleanTableTeams");
            log.LogInformation($"-------------------------------------------------------------------------");
            return new OkObjectResult(new { Ok = true });
        }
    }
}
