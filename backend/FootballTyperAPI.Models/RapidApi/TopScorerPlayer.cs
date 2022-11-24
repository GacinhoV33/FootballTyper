namespace FootballTyperAPI.Models.RapidApi
{
    public class TopScorerPlayer
    {
        public int id { get; set; }
        public string name { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public int age { get; set; }

        //public string birth { get; set; }
        public string nationality { get; set; }
        public string height { get; set; }
        public string weight { get; set; }
        public bool injured { get; set; }
        public string photo { get; set; }
    }
}

//"player": {
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