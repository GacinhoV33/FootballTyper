namespace FootballTyperAPI.Models.RapidApi
{
    public class TopScorerResponse
    {
        public string? get { get; set; }
        public int? results { get; set; }
        public Paging paging { get; set; }
        public IEnumerable<TopScorer>? response { get; set; }

    }

    public class Paging
    {
        public int current { get; set; }
        public int total { get; set; }
    }
}
