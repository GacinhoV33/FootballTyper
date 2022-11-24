using System;
using System.Threading.Tasks;
using FootballTyperAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public static class CleanDatabase
    {
        [FunctionName("CleanDatabase")]
         public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "CleanDatabase")] HttpRequest req,
            ILogger log)
        {
            log.LogInformation($"-------------------------------------------------------------------------");
            log.LogInformation($"Execution date: {DateTime.Now}");
            log.LogInformation($"Starting execution of: CleanDatabase");

            //var deleteBets = "DELETE FROM Bets";
            //ExecuteCommand(deleteBets, log);

            //var deleteMatch = "DELETE FROM Match";
            //ExecuteCommand(deleteMatch, log);

            //var deleteTeams = "DELETE FROM Teams";
            //ExecuteCommand(deleteTeams, log);

            log.LogInformation($"Ending execution of: CleanDatabase");
            log.LogInformation($"-------------------------------------------------------------------------");
            return new OkObjectResult(new { Ok = true });
        }

        public static void ExecuteCommand(string query, ILogger log)
        {
            var str = Environment.GetEnvironmentVariable("SqlConnectionString");
            using (SqlConnection conn = new SqlConnection(str))
            {
                conn.Open();

                using (SqlCommand cmd = new SqlCommand(query, conn))
                {
                    log.LogInformation($"Executing command: {query}");
                    var rows = cmd.ExecuteNonQueryAsync().GetAwaiter().GetResult();
                    log.LogInformation($"-- {rows} rows were updated");
                }
            }
        }
    }

}
