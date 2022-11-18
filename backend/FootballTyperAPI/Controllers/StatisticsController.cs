﻿using FootballTyperAPI.Data;
using FootballTyperAPI.Models;
using FootballTyperAPI.Models.RapidApi;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
//using Newtonsoft.Json;

namespace FootballTyperAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly FootballTyperAPIContext _context;

        public StatisticsController(FootballTyperAPIContext context)
        {
            _context = context;
        }

        // GET: api/Statistics/TopScorer/
        [HttpGet("TopScorer")]
        public async Task<ActionResult<IEnumerable<TopScorer>>> GetTopScorerFromRapidApi()
        {
            var topScorers = new List<TopScorer>();

            //var client = new HttpClient();
            //var request = new HttpRequestMessage
            //{
            //    Method = HttpMethod.Get,
            //    RequestUri = new Uri("https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=1&season=2018"),
            //    Headers =
            //    {
            //        { "X-RapidAPI-Key", "956d1c2a6fmsh3413ef9f05469c8p13d759jsn92988776e509" },
            //        { "X-RapidAPI-Host", "api-football-v1.p.rapidapi.com" },
            //    },
            //};

            //using (var response = await client.SendAsync(request))
            //{
            //    response.EnsureSuccessStatusCode();
            //    //var body = await response.Content.ReadAsStringAsync();
            //    var jsonString = response.Content.ReadAsStringAsync();
            //    jsonString.Wait();
            //    Console.WriteLine(jsonString.Result);
            //    var jsonStringResult = jsonString.Result;

            //    topScorers = JsonSerializer.Deserialize<List<TopScorer>>(jsonString.Result);
            //}

            string bodyString;
            TopScorerResponse topScorersResponse;
            try
            {
                bodyString = "{\"get\":\"players\\/topscorers\",\"parameters\":{\"league\":\"1\",\"season\":\"2018\"},\"errors\":[],\"results\":20,\"paging\":{\"current\":0,\"total\":1},\"response\":[{\"player\":{\"id\":184,\"name\":\"H. Kane\",\"firstname\":\"Harry Edward\",\"lastname\":\"Kane\",\"age\":29,\"birth\":{\"date\":\"1993-07-28\",\"place\":\"London\",\"country\":\"England\"},\"nationality\":\"England\",\"height\":\"188 cm\",\"weight\":\"86 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/184.png\"},\"statistics\":[{\"team\":{\"id\":10,\"name\":\"England\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/10.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":6,\"lineups\":6,\"minutes\":573,\"number\":null,\"position\":\"Attacker\",\"rating\":\"7.916666\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":1,\"bench\":1},\"shots\":{\"total\":13,\"on\":6},\"goals\":{\"total\":6,\"conceded\":0,\"assists\":null,\"saves\":null},\"passes\":{\"total\":150,\"key\":4,\"accuracy\":17},\"tackles\":{\"total\":1,\"blocks\":null,\"interceptions\":3},\"duels\":{\"total\":89,\"won\":53},\"dribbles\":{\"attempts\":4,\"success\":2,\"past\":null},\"fouls\":{\"drawn\":21,\"committed\":4},\"cards\":{\"yellow\":0,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":3,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":907,\"name\":\"R. Lukaku\",\"firstname\":\"Romelu\",\"lastname\":\"Lukaku Bolingoli\",\"age\":29,\"birth\":{\"date\":\"1993-05-13\",\"place\":\"Antwerpen\",\"country\":\"Belgium\"},\"nationality\":\"Belgium\",\"height\":\"190 cm\",\"weight\":\"93 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/907.png\"},\"statistics\":[{\"team\":{\"id\":1,\"name\":\"Belgium\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/1.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":6,\"lineups\":6,\"minutes\":476,\"number\":null,\"position\":\"Attacker\",\"rating\":\"6.966666\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":3,\"bench\":1},\"shots\":{\"total\":9,\"on\":5},\"goals\":{\"total\":4,\"conceded\":0,\"assists\":1,\"saves\":null},\"passes\":{\"total\":98,\"key\":5,\"accuracy\":12},\"tackles\":{\"total\":1,\"blocks\":null,\"interceptions\":null},\"duels\":{\"total\":54,\"won\":22},\"dribbles\":{\"attempts\":8,\"success\":6,\"past\":null},\"fouls\":{\"drawn\":3,\"committed\":10},\"cards\":{\"yellow\":0,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":278,\"name\":\"K. Mbapp\\u00e9\",\"firstname\":\"Kylian\",\"lastname\":\"Mbapp\\u00e9 Lottin\",\"age\":24,\"birth\":{\"date\":\"1998-12-20\",\"place\":\"Paris\",\"country\":\"France\"},\"nationality\":\"France\",\"height\":\"178 cm\",\"weight\":\"75 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/278.png\"},\"statistics\":[{\"team\":{\"id\":2,\"name\":\"France\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/2.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":7,\"lineups\":6,\"minutes\":534,\"number\":null,\"position\":\"Attacker\",\"rating\":\"7.385714\",\"captain\":false},\"substitutes\":{\"in\":1,\"out\":3,\"bench\":1},\"shots\":{\"total\":8,\"on\":7},\"goals\":{\"total\":4,\"conceded\":0,\"assists\":null,\"saves\":null},\"passes\":{\"total\":151,\"key\":9,\"accuracy\":16},\"tackles\":{\"total\":6,\"blocks\":null,\"interceptions\":2},\"duels\":{\"total\":95,\"won\":54},\"dribbles\":{\"attempts\":53,\"success\":32,\"past\":null},\"fouls\":{\"drawn\":14,\"committed\":1},\"cards\":{\"yellow\":2,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":923,\"name\":\"D. Cheryshev\",\"firstname\":\"Denis\",\"lastname\":\"Cheryshev\",\"age\":32,\"birth\":{\"date\":\"1990-12-26\",\"place\":\"Nizhniy Novgorod\",\"country\":\"Russia\"},\"nationality\":\"Russia\",\"height\":\"179 cm\",\"weight\":\"74 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/923.png\"},\"statistics\":[{\"team\":{\"id\":4,\"name\":\"Russia\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/4.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":5,\"lineups\":3,\"minutes\":304,\"number\":null,\"position\":\"Midfielder\",\"rating\":\"7.220000\",\"captain\":false},\"substitutes\":{\"in\":2,\"out\":3,\"bench\":2},\"shots\":{\"total\":11,\"on\":6},\"goals\":{\"total\":4,\"conceded\":0,\"assists\":null,\"saves\":null},\"passes\":{\"total\":77,\"key\":null,\"accuracy\":10},\"tackles\":{\"total\":7,\"blocks\":null,\"interceptions\":6},\"duels\":{\"total\":45,\"won\":20},\"dribbles\":{\"attempts\":8,\"success\":6,\"past\":null},\"fouls\":{\"drawn\":1,\"committed\":7},\"cards\":{\"yellow\":0,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":874,\"name\":\"Cristiano Ronaldo\",\"firstname\":\"Cristiano Ronaldo\",\"lastname\":\"dos Santos Aveiro\",\"age\":37,\"birth\":{\"date\":\"1985-02-05\",\"place\":\"Funchal\",\"country\":\"Portugal\"},\"nationality\":\"Portugal\",\"height\":\"187 cm\",\"weight\":\"83 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/874.png\"},\"statistics\":[{\"team\":{\"id\":27,\"name\":\"Portugal\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/27.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":4,\"lineups\":4,\"minutes\":360,\"number\":null,\"position\":\"Attacker\",\"rating\":\"7.975000\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":0,\"bench\":0},\"shots\":{\"total\":12,\"on\":8},\"goals\":{\"total\":4,\"conceded\":0,\"assists\":null,\"saves\":null},\"passes\":{\"total\":116,\"key\":4,\"accuracy\":23},\"tackles\":{\"total\":null,\"blocks\":1,\"interceptions\":null},\"duels\":{\"total\":52,\"won\":29},\"dribbles\":{\"attempts\":13,\"success\":7,\"past\":null},\"fouls\":{\"drawn\":14,\"committed\":3},\"cards\":{\"yellow\":2,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":1,\"missed\":1,\"saved\":null}}]},{\"player\":{\"id\":56,\"name\":\"A. Griezmann\",\"firstname\":\"Antoine\",\"lastname\":\"Griezmann\",\"age\":31,\"birth\":{\"date\":\"1991-03-21\",\"place\":\"M\\u00e2con\",\"country\":\"France\"},\"nationality\":\"France\",\"height\":\"173 cm\",\"weight\":\"73 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/56.png\"},\"statistics\":[{\"team\":{\"id\":2,\"name\":\"France\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/2.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":7,\"lineups\":7,\"minutes\":571,\"number\":null,\"position\":\"Attacker\",\"rating\":\"7.400000\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":5,\"bench\":0},\"shots\":{\"total\":19,\"on\":11},\"goals\":{\"total\":4,\"conceded\":0,\"assists\":2,\"saves\":null},\"passes\":{\"total\":233,\"key\":10,\"accuracy\":24},\"tackles\":{\"total\":10,\"blocks\":null,\"interceptions\":1},\"duels\":{\"total\":70,\"won\":34},\"dribbles\":{\"attempts\":11,\"success\":8,\"past\":null},\"fouls\":{\"drawn\":11,\"committed\":6},\"cards\":{\"yellow\":0,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":3,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":207,\"name\":\"I. Peri\\u0161i\\u0107\",\"firstname\":\"Ivan\",\"lastname\":\"Peri\\u0161i\\u0107\",\"age\":33,\"birth\":{\"date\":\"1989-02-02\",\"place\":\"Split\",\"country\":\"Croatia\"},\"nationality\":\"Croatia\",\"height\":\"186 cm\",\"weight\":\"80 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/207.png\"},\"statistics\":[{\"team\":{\"id\":3,\"name\":\"Croatia\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/3.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":7,\"lineups\":7,\"minutes\":632,\"number\":null,\"position\":\"Midfielder\",\"rating\":\"6.914285\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":3,\"bench\":0},\"shots\":{\"total\":18,\"on\":4},\"goals\":{\"total\":3,\"conceded\":0,\"assists\":1,\"saves\":null},\"passes\":{\"total\":170,\"key\":7,\"accuracy\":17},\"tackles\":{\"total\":9,\"blocks\":2,\"interceptions\":4},\"duels\":{\"total\":74,\"won\":31},\"dribbles\":{\"attempts\":10,\"success\":5,\"past\":null},\"fouls\":{\"drawn\":5,\"committed\":4},\"cards\":{\"yellow\":0,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":878,\"name\":\"M. Mand\\u017euki\\u0107\",\"firstname\":\"Mario\",\"lastname\":\"Mand\\u017euki\\u0107\",\"age\":35,\"birth\":{\"date\":\"1986-05-21\",\"place\":\"Slavonski Brod\",\"country\":\"Croatia\"},\"nationality\":\"Croatia\",\"height\":\"190 cm\",\"weight\":\"85 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/878.png\"},\"statistics\":[{\"team\":{\"id\":3,\"name\":\"Croatia\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/3.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":6,\"lineups\":6,\"minutes\":609,\"number\":null,\"position\":\"Attacker\",\"rating\":\"7.333333\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":4,\"bench\":1},\"shots\":{\"total\":11,\"on\":5},\"goals\":{\"total\":3,\"conceded\":0,\"assists\":1,\"saves\":null},\"passes\":{\"total\":176,\"key\":8,\"accuracy\":19},\"tackles\":{\"total\":12,\"blocks\":1,\"interceptions\":2},\"duels\":{\"total\":101,\"won\":53},\"dribbles\":{\"attempts\":3,\"success\":2,\"past\":null},\"fouls\":{\"drawn\":12,\"committed\":13},\"cards\":{\"yellow\":2,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":54,\"name\":\"Diego Costa\",\"firstname\":\"Diego\",\"lastname\":\"da Silva Costa\",\"age\":34,\"birth\":{\"date\":\"1988-10-07\",\"place\":\"Lagarto\",\"country\":\"Brazil\"},\"nationality\":\"Spain\",\"height\":\"188 cm\",\"weight\":\"83 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/54.png\"},\"statistics\":[{\"team\":{\"id\":9,\"name\":\"Spain\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/9.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":4,\"lineups\":4,\"minutes\":320,\"number\":null,\"position\":\"Attacker\",\"rating\":\"7.150000\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":4,\"bench\":0},\"shots\":{\"total\":10,\"on\":6},\"goals\":{\"total\":3,\"conceded\":0,\"assists\":null,\"saves\":null},\"passes\":{\"total\":67,\"key\":4,\"accuracy\":13},\"tackles\":{\"total\":2,\"blocks\":null,\"interceptions\":null},\"duels\":{\"total\":36,\"won\":9},\"dribbles\":{\"attempts\":3,\"success\":2,\"past\":null},\"fouls\":{\"drawn\":2,\"committed\":3},\"cards\":{\"yellow\":0,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":274,\"name\":\"E. Cavani\",\"firstname\":\"Edinson Roberto\",\"lastname\":\"Cavani G\\u00f3mez\",\"age\":35,\"birth\":{\"date\":\"1987-02-14\",\"place\":\"Salto\",\"country\":\"Uruguay\"},\"nationality\":\"Uruguay\",\"height\":\"184 cm\",\"weight\":\"71 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/274.png\"},\"statistics\":[{\"team\":{\"id\":7,\"name\":\"Uruguay\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/7.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":4,\"lineups\":4,\"minutes\":344,\"number\":null,\"position\":\"Attacker\",\"rating\":\"7.825000\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":2,\"bench\":0},\"shots\":{\"total\":12,\"on\":7},\"goals\":{\"total\":3,\"conceded\":0,\"assists\":null,\"saves\":null},\"passes\":{\"total\":87,\"key\":2,\"accuracy\":17},\"tackles\":{\"total\":6,\"blocks\":null,\"interceptions\":1},\"duels\":{\"total\":43,\"won\":23},\"dribbles\":{\"attempts\":7,\"success\":7,\"past\":null},\"fouls\":{\"drawn\":6,\"committed\":4},\"cards\":{\"yellow\":0,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":2484,\"name\":\"Y. Mina\",\"firstname\":\"Yerry Fernando\",\"lastname\":\"Mina Gonz\\u00e1lez\",\"age\":28,\"birth\":{\"date\":\"1994-09-23\",\"place\":\"Guachen\\u00e9\",\"country\":\"Colombia\"},\"nationality\":\"Colombia\",\"height\":\"195 cm\",\"weight\":\"94 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/2484.png\"},\"statistics\":[{\"team\":{\"id\":8,\"name\":\"Colombia\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/8.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":3,\"lineups\":3,\"minutes\":300,\"number\":null,\"position\":\"Defender\",\"rating\":\"7.900000\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":0,\"bench\":1},\"shots\":{\"total\":3,\"on\":3},\"goals\":{\"total\":3,\"conceded\":0,\"assists\":null,\"saves\":null},\"passes\":{\"total\":158,\"key\":1,\"accuracy\":47},\"tackles\":{\"total\":4,\"blocks\":2,\"interceptions\":3},\"duels\":{\"total\":39,\"won\":24},\"dribbles\":{\"attempts\":1,\"success\":1,\"past\":null},\"fouls\":{\"drawn\":5,\"committed\":6},\"cards\":{\"yellow\":0,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":2296,\"name\":\"E. Hazard\",\"firstname\":\"Eden Michael\",\"lastname\":\"Hazard\",\"age\":31,\"birth\":{\"date\":\"1991-01-07\",\"place\":\"La Louvi\\u00e8re\",\"country\":\"Belgium\"},\"nationality\":\"Belgium\",\"height\":\"175 cm\",\"weight\":\"74 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/2296.png\"},\"statistics\":[{\"team\":{\"id\":1,\"name\":\"Belgium\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/1.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":6,\"lineups\":6,\"minutes\":518,\"number\":null,\"position\":\"Attacker\",\"rating\":\"8.116666\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":1,\"bench\":1},\"shots\":{\"total\":12,\"on\":6},\"goals\":{\"total\":3,\"conceded\":0,\"assists\":2,\"saves\":null},\"passes\":{\"total\":268,\"key\":15,\"accuracy\":36},\"tackles\":{\"total\":4,\"blocks\":null,\"interceptions\":2},\"duels\":{\"total\":112,\"won\":77},\"dribbles\":{\"attempts\":52,\"success\":40,\"past\":null},\"fouls\":{\"drawn\":27,\"committed\":6},\"cards\":{\"yellow\":1,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":1,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":1223,\"name\":\"A. Dzyuba\",\"firstname\":\"Artem\",\"lastname\":\"Dzyuba\",\"age\":34,\"birth\":{\"date\":\"1988-08-22\",\"place\":\"Moskva\",\"country\":\"Russia\"},\"nationality\":\"Russia\",\"height\":\"196 cm\",\"weight\":\"91 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/1223.png\"},\"statistics\":[{\"team\":{\"id\":4,\"name\":\"Russia\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/4.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":5,\"lineups\":4,\"minutes\":333,\"number\":null,\"position\":\"Attacker\",\"rating\":\"7.220000\",\"captain\":false},\"substitutes\":{\"in\":1,\"out\":3,\"bench\":1},\"shots\":{\"total\":6,\"on\":4},\"goals\":{\"total\":3,\"conceded\":0,\"assists\":2,\"saves\":null},\"passes\":{\"total\":106,\"key\":5,\"accuracy\":14},\"tackles\":{\"total\":1,\"blocks\":1,\"interceptions\":2},\"duels\":{\"total\":121,\"won\":54},\"dribbles\":{\"attempts\":8,\"success\":3,\"past\":null},\"fouls\":{\"drawn\":10,\"committed\":15},\"cards\":{\"yellow\":0,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":1,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":147,\"name\":\"Philippe Coutinho\",\"firstname\":\"Philippe\",\"lastname\":\"Coutinho Correia\",\"age\":30,\"birth\":{\"date\":\"1992-06-12\",\"place\":\"Rio de Janeiro\",\"country\":\"Brazil\"},\"nationality\":\"Brazil\",\"height\":\"172 cm\",\"weight\":\"68 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/147.png\"},\"statistics\":[{\"team\":{\"id\":6,\"name\":\"Brazil\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/6.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":5,\"lineups\":5,\"minutes\":436,\"number\":null,\"position\":\"Midfielder\",\"rating\":\"7.580000\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":2,\"bench\":0},\"shots\":{\"total\":14,\"on\":8},\"goals\":{\"total\":2,\"conceded\":0,\"assists\":2,\"saves\":null},\"passes\":{\"total\":326,\"key\":13,\"accuracy\":58},\"tackles\":{\"total\":5,\"blocks\":null,\"interceptions\":1},\"duels\":{\"total\":49,\"won\":23},\"dribbles\":{\"attempts\":12,\"success\":7,\"past\":null},\"fouls\":{\"drawn\":7,\"committed\":3},\"cards\":{\"yellow\":1,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":22102,\"name\":\"W. Khazri\",\"firstname\":\"Wahbi\",\"lastname\":\"Khazri\",\"age\":31,\"birth\":{\"date\":\"1991-02-08\",\"place\":\"Ajaccio\",\"country\":\"France\"},\"nationality\":\"Tunisia\",\"height\":\"176 cm\",\"weight\":\"80 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/22102.png\"},\"statistics\":[{\"team\":{\"id\":28,\"name\":\"Tunisia\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/28.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":3,\"lineups\":3,\"minutes\":264,\"number\":null,\"position\":\"Attacker\",\"rating\":\"7.566666\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":2,\"bench\":0},\"shots\":{\"total\":9,\"on\":5},\"goals\":{\"total\":2,\"conceded\":0,\"assists\":2,\"saves\":null},\"passes\":{\"total\":75,\"key\":7,\"accuracy\":20},\"tackles\":{\"total\":3,\"blocks\":null,\"interceptions\":1},\"duels\":{\"total\":23,\"won\":8},\"dribbles\":{\"attempts\":3,\"success\":null,\"past\":null},\"fouls\":{\"drawn\":4,\"committed\":2},\"cards\":{\"yellow\":0,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":276,\"name\":\"Neymar\",\"firstname\":\"Neymar\",\"lastname\":\"da Silva Santos J\\u00fanior\",\"age\":30,\"birth\":{\"date\":\"1992-02-05\",\"place\":\"Mogi das Cruzes\",\"country\":\"Brazil\"},\"nationality\":\"Brazil\",\"height\":\"175 cm\",\"weight\":\"68 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/276.png\"},\"statistics\":[{\"team\":{\"id\":6,\"name\":\"Brazil\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/6.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":5,\"lineups\":5,\"minutes\":450,\"number\":null,\"position\":\"Attacker\",\"rating\":\"7.860000\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":0,\"bench\":0},\"shots\":{\"total\":18,\"on\":13},\"goals\":{\"total\":2,\"conceded\":0,\"assists\":1,\"saves\":null},\"passes\":{\"total\":250,\"key\":23,\"accuracy\":42},\"tackles\":{\"total\":5,\"blocks\":1,\"interceptions\":null},\"duels\":{\"total\":110,\"won\":54},\"dribbles\":{\"attempts\":39,\"success\":22,\"past\":null},\"fouls\":{\"drawn\":26,\"committed\":4},\"cards\":{\"yellow\":1,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":2600,\"name\":\"T. Inui\",\"firstname\":\"Takashi\",\"lastname\":\"Inui\",\"age\":34,\"birth\":{\"date\":\"1988-06-02\",\"place\":\"\\u014cmihachiman\",\"country\":\"Japan\"},\"nationality\":\"Japan\",\"height\":\"169 cm\",\"weight\":\"63 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/2600.png\"},\"statistics\":[{\"team\":{\"id\":12,\"name\":\"Japan\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/12.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":4,\"lineups\":3,\"minutes\":292,\"number\":null,\"position\":\"Midfielder\",\"rating\":\"7.075000\",\"captain\":false},\"substitutes\":{\"in\":1,\"out\":1,\"bench\":1},\"shots\":{\"total\":6,\"on\":4},\"goals\":{\"total\":2,\"conceded\":0,\"assists\":1,\"saves\":null},\"passes\":{\"total\":126,\"key\":2,\"accuracy\":27},\"tackles\":{\"total\":7,\"blocks\":null,\"interceptions\":null},\"duels\":{\"total\":40,\"won\":18},\"dribbles\":{\"attempts\":2,\"success\":1,\"past\":null},\"fouls\":{\"drawn\":9,\"committed\":2},\"cards\":{\"yellow\":1,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":626,\"name\":\"J. Stones\",\"firstname\":\"John\",\"lastname\":\"Stones\",\"age\":28,\"birth\":{\"date\":\"1994-05-28\",\"place\":\"Barnsley\",\"country\":\"England\"},\"nationality\":\"England\",\"height\":\"188 cm\",\"weight\":\"70 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/626.png\"},\"statistics\":[{\"team\":{\"id\":10,\"name\":\"England\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/10.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":7,\"lineups\":7,\"minutes\":646,\"number\":null,\"position\":\"Defender\",\"rating\":\"7.485714\",\"captain\":false},\"substitutes\":{\"in\":0,\"out\":1,\"bench\":0},\"shots\":{\"total\":6,\"on\":4},\"goals\":{\"total\":2,\"conceded\":0,\"assists\":null,\"saves\":null},\"passes\":{\"total\":479,\"key\":null,\"accuracy\":64},\"tackles\":{\"total\":11,\"blocks\":8,\"interceptions\":7},\"duels\":{\"total\":52,\"won\":36},\"dribbles\":{\"attempts\":null,\"success\":null,\"past\":null},\"fouls\":{\"drawn\":4,\"committed\":4},\"cards\":{\"yellow\":1,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]},{\"player\":{\"id\":157,\"name\":\"Luis Alberto Su\\u00e1rez D\\u00edaz\",\"firstname\":\"Luis Alberto\",\"lastname\":\"Su\\u00e1rez D\\u00edaz\",\"age\":35,\"birth\":{\"date\":\"1987-01-24\",\"place\":\"Salto\",\"country\":\"Uruguay\"},\"nationality\":\"Uruguay\",\"height\":\"182 cm\",\"weight\":\"86 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/157.png\"},\"statistics\":[{\"team\":{\"id\":7,\"name\":\"Uruguay\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/7.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":5,\"lineups\":5,\"minutes\":450,\"number\":null,\"position\":\"Attacker\",\"rating\":null,\"captain\":false},\"substitutes\":{\"in\":0,\"out\":0,\"bench\":0},\"shots\":{\"total\":null,\"on\":null},\"goals\":{\"total\":2,\"conceded\":null,\"assists\":null,\"saves\":null},\"passes\":{\"total\":null,\"key\":null,\"accuracy\":null},\"tackles\":{\"total\":null,\"blocks\":null,\"interceptions\":null},\"duels\":{\"total\":null,\"won\":null},\"dribbles\":{\"attempts\":null,\"success\":null,\"past\":null},\"fouls\":{\"drawn\":null,\"committed\":null},\"cards\":{\"yellow\":0,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":null,\"missed\":null,\"saved\":null}}]},{\"player\":{\"id\":642,\"name\":\"S. Ag\\u00fcero\",\"firstname\":\"Sergio Leonel\",\"lastname\":\"Ag\\u00fcero del Castillo\",\"age\":33,\"birth\":{\"date\":\"1988-06-02\",\"place\":\"Quilmes\",\"country\":\"Argentina\"},\"nationality\":\"Argentina\",\"height\":\"173 cm\",\"weight\":\"70 kg\",\"injured\":false,\"photo\":\"https:\\/\\/media.api-sports.io\\/football\\/players\\/642.png\"},\"statistics\":[{\"team\":{\"id\":26,\"name\":\"Argentina\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/teams\\/26.png\"},\"league\":{\"id\":1,\"name\":\"World Cup\",\"country\":\"World\",\"logo\":\"https:\\/\\/media.api-sports.io\\/football\\/leagues\\/1.png\",\"flag\":null,\"season\":2018},\"games\":{\"appearences\":4,\"lineups\":2,\"minutes\":178,\"number\":null,\"position\":\"Attacker\",\"rating\":\"7.000000\",\"captain\":false},\"substitutes\":{\"in\":2,\"out\":1,\"bench\":2},\"shots\":{\"total\":3,\"on\":3},\"goals\":{\"total\":2,\"conceded\":0,\"assists\":null,\"saves\":null},\"passes\":{\"total\":60,\"key\":1,\"accuracy\":16},\"tackles\":{\"total\":3,\"blocks\":null,\"interceptions\":null},\"duels\":{\"total\":15,\"won\":8},\"dribbles\":{\"attempts\":5,\"success\":3,\"past\":null},\"fouls\":{\"drawn\":1,\"committed\":null},\"cards\":{\"yellow\":0,\"yellowred\":0,\"red\":0},\"penalty\":{\"won\":null,\"commited\":null,\"scored\":0,\"missed\":0,\"saved\":null}}]}]}";

                topScorersResponse = JsonSerializer.Deserialize<TopScorerResponse>(bodyString);
                topScorers = topScorersResponse.response.ToList();
            }
            catch (Exception ex)
            {
                var nex = ex;
            }

            if (topScorers == null)
            {
                return NotFound();
            }

            foreach (var topScorer in topScorers)
            {
                var topScorerDb = new TopScorerDb()
                {
                    Name = topScorer.player.name,
                    Goals = topScorer.statistics.First()?.goals?.total ?? 0,
                    Assists = topScorer.statistics.First()?.goals?.assists ?? 0,
                    RedCards = topScorer.statistics.First()?.cards.red ?? 0,
                    YellowCards = topScorer.statistics.First()?.cards.yellow ?? 0,
                    Group = "A"
                };

                try
                {
                    _context.TopScorers.Add(topScorerDb);
                    await _context.SaveChangesAsync();
                }
                catch (Exception ex)
                {
                    var nex = ex;
                }
            }

            return topScorers;
        }



        //// GET: api/Statistics
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<TopScorer>>> GetTopScorer()
        //{
        //    return await _context.TopScorer.ToListAsync();
        //}

        //// GET: api/Statistics/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<TopScorer>> GetTopScorer(int id)
        //{
        //    var topScorer = await _context.TopScorer.FindAsync(id);

        //    if (topScorer == null)
        //    {
        //        return NotFound();
        //    }

        //    return topScorer;
        //}

        //// PUT: api/Statistics/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutTopScorer(int id, TopScorer topScorer)
        //{
        //    if (id != topScorer.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(topScorer).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TopScorerExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        //// POST: api/Statistics
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPost]
        //public async Task<ActionResult<TopScorer>> PostTopScorer(TopScorer topScorer)
        //{
        //    _context.TopScorer.Add(topScorer);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetTopScorer", new { id = topScorer.Id }, topScorer);
        //}

        //// DELETE: api/Statistics/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteTopScorer(int id)
        //{
        //    var topScorer = await _context.TopScorer.FindAsync(id);
        //    if (topScorer == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.TopScorer.Remove(topScorer);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool TopScorerExists(int id)
        //{
        //    return _context.TopScorer.Any(e => e.Id == id);
        //}
    }
}
