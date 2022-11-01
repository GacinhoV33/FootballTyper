namespace FootballTyperAPI.Models
{
    public class Team
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        //public List<Player> Players;
        public string? Coach { get; set; }
        public int Points { get; set; }
        public int PlayedMatchesNbr { get; set; }
        public int Won { get; set; }
        public int Drawn { get; set; }
        public int Lost { get; set; }
        public string? Group { get; set; }
    }
}
