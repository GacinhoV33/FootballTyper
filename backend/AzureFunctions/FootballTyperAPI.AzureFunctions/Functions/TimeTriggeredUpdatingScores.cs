using FootballTyperAPI.Common;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using System;

namespace FootballTyperAPI.AzureFunctions.Functions
{
    public static class TimeTriggeredUpdatingScores
    {
        [FunctionName("TimeTriggeredUpdatingScores")]
        public static void Run([TimerTrigger("0 0,30 13,14,15,16,17,18,19,20,21,22,23,0 * * *")] TimerInfo myTimer, ILogger log)
        //public static void Run([TimerTrigger("0 32 * * * *")] TimerInfo myTimer, ILogger log)
        {
            log.LogInformation($"-------------------------------------------------------------------------");
            log.LogInformation($"Execution date: {DateTime.Now}");
            log.LogInformation($"Starting execution of: TimeTriggeredUpdatingScores");

            var updateMatchResult = HttpRequestHelper.Get("api/UpdateMatchResults");
            log.LogInformation(updateMatchResult.ToString());
            if (updateMatchResult.IsSuccessStatusCode)
            {
                var updateScoreAfterMatchResult = HttpRequestHelper.Get("api/UpdateScoreAfterMatch");
                log.LogInformation(updateScoreAfterMatchResult.ToString());
                if (updateScoreAfterMatchResult.IsSuccessStatusCode)
                {
                    var updateTyperScoresResult = HttpRequestHelper.Get("api/UpdateTyperScores");
                    log.LogInformation(updateTyperScoresResult.ToString());
                }
            }

            if (DateTime.Now >= DateTime.Now.ChangeTime(hours: 22, minutes: 20)
                            && DateTime.Now <= DateTime.Now.ChangeTime(hours: 22, minutes: 45))
            {
                var getTopScorersResult = HttpRequestHelper.Get("api/GetTopScorers");
                log.LogInformation(getTopScorersResult.ToString());
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
