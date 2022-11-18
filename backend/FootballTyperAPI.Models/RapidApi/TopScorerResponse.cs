using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballTyperAPI.Models.RapidApi
{
    public class TopScorerResponse
    {
        public string? get { get; set; }
        public int? results { get; set; }
        public IEnumerable<TopScorer>? response { get; set; }

    }
}
