using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace UpdatScoreAfterMatch
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
            client.BaseAddress = new Uri(Environment.GetEnvironmentVariable("HostUrl"));
            return await client.GetAsync(path);
        }
    }
}