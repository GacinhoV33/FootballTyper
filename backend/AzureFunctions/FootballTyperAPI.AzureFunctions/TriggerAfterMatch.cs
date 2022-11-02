using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;

namespace FootballTyperAPI.AzureFunctions
{
    public class TriggerAfterMatch
    {
        [FunctionName("TriggerAfterMatch")]
        public async Task Run([TimerTrigger("*/15 * * * * *")] TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"C# Timer trigger function executed at: {DateTime.Now}");
            var result = await Get("api/UpdateScoreAfterMatch");
        }

        private async Task<HttpResponseMessage> Get(string path)
        {
            using var client = new HttpClient();
            client.DefaultRequestHeaders.Add("x-functions-key", Environment.GetEnvironmentVariable("FunctionKey"));
            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable("HostUrl"));
            return await client.GetAsync(path);
        }
    }
}
