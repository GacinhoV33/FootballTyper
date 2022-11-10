using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballTyperAPI.Models
{
    public enum TyperScores
    {
        WrongScore = 0,

        GroupCorrectWinnerOrDraw = 2,
        GroupExactScore = 4,

        EightfinalCorrectWinnerOrDraw = 3,
        EightfinalExactScore = 6,

        QuarterfinalCorrectWinnerOrDraw = 4,
        QuarterfinalExactScore = 8,

        SemifinalWinnerOrDraw = 5,
        SemifinalExactScore = 10,

        FinalCorrectWinnerOrDraw = 6,
        FinalExactScore = 12,
    }
}
