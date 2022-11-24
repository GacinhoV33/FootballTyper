using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballTyperAPI.Models.RapidApi
{
    public class TopScorer
    {
        public int Id { get; set; }
        public TopScorerPlayer player { get; set; }
        public IEnumerable<TopScorerStatistics> statistics { get; set; }
    }
}

//{
//    "player": {
//        "id": 184,
//        "name": "H. Kane",
//        "firstname": "Harry Edward",
//        "lastname": "Kane",
//        "age": 29,
//        "birth": {
//            "date": "1993-07-28",
//          "place": "London",
//          "country": "England"
//        },
//        "nationality": "England",
//        "height": "188 cm",
//        "weight": "86 kg",
//        "injured": false,
//        "photo": "https://media.api-sports.io/football/players/184.png"
//        },
//      "statistics": [
//        {
//        "team": {
//            "id": 10,
//            "name": "England",
//            "logo": "https://media.api-sports.io/football/teams/10.png"
//            },
//          "league": {
//            "id": 1,
//            "name": "World Cup",
//            "country": "World",
//            "logo": "https://media.api-sports.io/football/leagues/1.png",
//            "flag": null,
//            "season": 2018
//          },
//          "games": {
//            "appearences": 6,
//            "lineups": 6,
//            "minutes": 573,
//            "number": null,
//            "position": "Attacker",
//            "rating": "7.916666",
//            "captain": false
//          },
//          "substitutes": {
//            "in": 0,
//            "out": 1,
//            "bench": 1
//          },
//          "shots": {
//            "total": 13,
//            "on": 6
//          },
//          "goals": {
//            "total": 6,
//            "conceded": 0,
//            "assists": null,
//            "saves": null
//          },
//          "passes": {
//            "total": 150,
//            "key": 4,
//            "accuracy": 17
//          },
//          "tackles": {
//            "total": 1,
//            "blocks": null,
//            "interceptions": 3
//          },
//          "duels": {
//            "total": 89,
//            "won": 53
//          },
//          "dribbles": {
//            "attempts": 4,
//            "success": 2,
//            "past": null
//          },
//          "fouls": {
//            "drawn": 21,
//            "committed": 4
//          },
//          "cards": {
//            "yellow": 0,
//            "yellowred": 0,
//            "red": 0
//          },
//          "penalty": {
//            "won": null,
//            "commited": null,
//            "scored": 3,
//            "missed": 0,
//            "saved": null
//          }
//    }
//      ]
//    },