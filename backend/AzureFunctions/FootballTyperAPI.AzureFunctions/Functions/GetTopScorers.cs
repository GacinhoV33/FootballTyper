using FootballTyperAPI.Models;
using FootballTyperAPI.Models.RapidApi;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;

namespace Company.Function
{
    public static class GetTopScorers
    {
        [FunctionName("GetTopScorers")]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = "GetTopScorers")] HttpRequest req,
            [Sql("SELECT * FROM [dbo].[TopScorers]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] IEnumerable<TopScorerDb> TopScorers,
            [Sql("[dbo].[TopScorers]",
                CommandType = System.Data.CommandType.Text,
                ConnectionStringSetting = "SqlConnectionString")] out TopScorerDb[] outTopScorer,
            ILogger log)
        {
            var topScorersRapidApi = new List<TopScorer>();
            var topScorers = new List<TopScorerDb>();

            var client = new HttpClient();

            var isMorePages = true;
            var pageNumber = 1;
            var totalPages = 0;
            //while (isMorePages)
            //{
            //    var request = new HttpRequestMessage
            //    {
            //        Method = HttpMethod.Get,
            //        RequestUri = new Uri($"https://api-football-v1.p.rapidapi.com/v3/players?league=1&season=2022&page={pageNumber}"),
            //        Headers =
            //    {
            //        { "X-RapidAPI-Key", "956d1c2a6fmsh3413ef9f05469c8p13d759jsn92988776e509" },
            //        { "X-RapidAPI-Host", "api-football-v1.p.rapidapi.com" },
            //    },
            //    };
            //    using (var response = client.Send(request))
            //    {
            //        try
            //        {


            //            response.EnsureSuccessStatusCode();
            //            //var body = await response.Content.ReadAsStringAsync();
            //            var jsonString = response.Content.ReadAsStringAsync();
            //            jsonString.Wait();
            //            Console.WriteLine(jsonString.Result);
            //            var jsonStringResult = jsonString.Result;
            //            var topScorersResponse = JsonSerializer.Deserialize<TopScorerResponse>(jsonStringResult);

            //            totalPages = topScorersResponse.paging.total;
            //            topScorersRapidApi.AddRange(topScorersResponse.response.ToList());

            //            //response.EnsureSuccessStatusCode();
            //            //var body = response.Content.ReadAsStringAsync().GetAwaiter().GetResult();
            //            //topScorersRapidApi = JsonSerializer.Deserialize<List<TopScorer>>(body);
            //        }
            //        catch (Exception ex)
            //        {
            //            break;
            //        }
            //    }

            //    if(pageNumber > totalPages)
            //    {
            //        isMorePages = false;
            //        break;
            //    }
            //    else
            //    {
            //        isMorePages = true;
            //        pageNumber++;
            //    }
            //}

            //foreach (var topScorer in topScorersRapidApi)
            //{
            //    try
            //    {
            //        var topScorerDb = new TopScorerDb()
            //        {
            //            Name = topScorer.player.name,
            //            Goals = topScorer.statistics.First()?.goals?.total ?? 0,
            //            Assists = topScorer.statistics.First()?.goals?.assists ?? 0,
            //            RedCards = topScorer.statistics.First()?.cards.red ?? 0,
            //            YellowCards = topScorer.statistics.First()?.cards.yellow ?? 0,
            //            Group = MapGroup(topScorer.player.nationality)
            //        };
            //        topScorers.Add(topScorerDb);
            //    }
            //    catch (Exception ex)
            //    {

            //    }
            //}


            outTopScorer = topScorers.ToArray();

            return new OkObjectResult(new { Ok = true });
        }

        private static string MapGroup(string nationality)
        {
            var countryDict = new Dictionary<string, string>() {
                { "Ecuador", "Group A"},
                { "Senegal", "Group A"},
                { "Netherlands", "Group A"},
                { "Qatar", "Group A"},

                { "England", "Group B"},
                { "Iran", "Group B"},
                { "United States", "Group B"},
                { "Wales", "Group B"},

                { "Argentina", "Group C"},
                { "Saudi Arabia", "Group C"},
                { "Mexico", "Group C"},
                { "Poland", "Group C"},

                { "France", "Group D"},
                { "Australia", "Group D"},
                { "Denmark", "Group D"},
                { "Tunisia", "Group D"},

                { "Spain", "Group E"},
                { "Costa Rica", "Group E"},
                { "Germany", "Group E"},
                { "Japan", "Group E"},

                { "Belgium", "Group F"},
                { "Canada", "Group F"},
                { "Morocco", "Group F"},
                { "Croatia", "Group F"},

                { "Brazil", "Group G"},
                { "Serbia", "Group G"},
                { "Switzerland", "Group G"},
                { "Cameroon", "Group G"},

                { "Portugal", "Group H"},
                { "Ghana", "Group H"},
                { "Uruguay", "Group H"},
                { "South Korea", "Group H"},

            };

            return countryDict[nationality];
        }
    }

}
