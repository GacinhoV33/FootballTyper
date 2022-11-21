using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using System;

namespace Company.Function
{
    public static class CleanTableBets
    {
        [FunctionName("CleanTableBets")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "CleanTableBets")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"-------------------------------------------------------------------------");
            log.LogInformation($"Execution date: {DateTime.Now}");
            log.LogInformation($"Starting execution of: CleanTableBets");

            //var deleteBets = "DELETE FROM Bets";
            //CleanDatabase.ExecuteCommand(deleteBets, log);

            log.LogInformation($"Ending execution of: CleanTableBets");
            log.LogInformation($"-------------------------------------------------------------------------");
            return new OkObjectResult(new { Ok = true });
        }
    }
}
