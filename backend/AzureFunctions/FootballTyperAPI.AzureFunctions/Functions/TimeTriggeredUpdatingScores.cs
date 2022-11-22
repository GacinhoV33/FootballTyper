using FootballTyperAPI.Common;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;

namespace FootballTyperAPI.AzureFunctions.Functions
{
    public static class TimeTriggeredUpdatingScores
    {
        [FunctionName("TimeTriggeredUpdatingScores")]
        //public static void Run([TimerTrigger("0 0 14,17,20,23 * * *")] TimerInfo myTimer, ILogger log)
        public static void Run([TimerTrigger("0 */20 * * * *")] TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"-------------------------------------------------------------------------");
            log.LogInformation($"Execution date: {DateTime.Now}");
            log.LogInformation($"Starting execution of: TimeTriggeredUpdatingScores");

            var updateMatchResult = HttpRequestHelper.Get("api/UpdateMatchResults");
            if (updateMatchResult.IsSuccessStatusCode)
            {
                var updateScoreAfterMatchResult = HttpRequestHelper.Get("api/UpdateScoreAfterMatch");
                if (updateScoreAfterMatchResult.IsSuccessStatusCode)
                {
                    var updateTyperScoresResult = HttpRequestHelper.Get("api/UpdateTyperScores");
                    if (updateTyperScoresResult.IsSuccessStatusCode)
                    {
                        if (DateTime.Now >= DateTime.Now.ChangeTime(hours: 22, minutes: 30))
                        {
                            var getTopScorersResult = HttpRequestHelper.Get("api/GetTopScorers");
                        }
                    }
                }
            }

            log.LogInformation($"Ending execution of: TimeTriggeredUpdatingScores");
            log.LogInformation($"-------------------------------------------------------------------------");
        }

        public static DateTime ChangeTime(this DateTime dateTime, int hours, int minutes = 0, int seconds = 0, int milliseconds = 0)
        {
            return new DateTime(
                dateTime.Year,
                dateTime.Month,
                dateTime.Day,
                hours,
                minutes,
                seconds,
                milliseconds,
                dateTime.Kind);
        }
    }
}
