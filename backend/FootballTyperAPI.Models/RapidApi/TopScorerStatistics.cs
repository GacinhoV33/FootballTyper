namespace FootballTyperAPI.Models.RapidApi
{
    public class TopScorerStatistics
    {
        public int Id { get; set; }
        //public TeamStatistics? team { get; set; }
        //public LeagueStatistics? league { get; set; }
        public GoalsStatistics? goals { get; set; }
        //public ShotStatistics? shots { get; set; }
        //public PassStatistics? passes { get; set; }
        public CardStatistics? cards { get; set; }
        //public FoulStatistics? fouls { get; set; }

    }

    public class TeamStatistics
    {
        public int? id { get; set; }
        public string? name { get; set; }
        public string? logo { get; set; }

    }

    public class LeagueStatistics
    {
        public int? id { get; set; }
        public string? name { get; set; }
        public string? country { get; set; }
        public string? logo { get; set; }
        public string? flag { get; set; }
        public int? season { get; set; }

    }

    public class GoalsStatistics
    {
        public int? id { get; set; }
        public int? total { get; set; }
        public int? conceded { get; set; }
        public int? assists { get; set; }
        public int? saves { get; set; }
    }

    public class ShotStatistics
    {
        public int? id { get; set; }
        public int? total { get; set; }
        public int? on { get; set; }
    }

    public class PassStatistics
    {
        public int? id { get; set; }
        public int? total { get; set; }
        public int? key { get; set; }
        public int? accuracy { get; set; }
    }

    public class CardStatistics
    {
        public int? id { get; set; }
        public int? yellow { get; set; }
        public int? yellowred { get; set; }
        public int? red { get; set; }
    }

    public class FoulStatistics
    {
        public int? id { get; set; }
        public int? drawn { get; set; }
        public int? committed { get; set; }
    }
}


//"statistics": [
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