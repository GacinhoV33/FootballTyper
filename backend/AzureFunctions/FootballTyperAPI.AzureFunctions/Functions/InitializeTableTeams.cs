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
    public static class InitializeTableTeams
    {
        [FunctionName("InitializeTableTeams")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "InitializeTableTeams")] HttpRequest req,
            [Sql("[dbo].[Teams]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] out Team[] outTeams,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger with SQL Output Binding function processed a request.");

            var teams = TeamHelper.GetAllValidTeams();

            outTeams = teams.ToArray();

            return new OkObjectResult(new { Ok = true });
        }
    }
}
