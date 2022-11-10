using FootballTyperAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FootballTyperAPI.AzureFunctions
{
    public static class ScoreHelper
    {
        public static int GetPointsByScoreResultAndStage(ScoreEnum matchOutcome, Stage? stage)
        {
            TyperScores score = TyperScores.WrongScore;
            if (stage == Stage.Group)
            {
                if (matchOutcome == ScoreEnum.CorrectOutcome)
                {
                    score = TyperScores.GroupCorrectWinnerOrDraw;
                }
                else if (matchOutcome == ScoreEnum.CorrectScoreBet)
                {
                    score = TyperScores.GroupExactScore;
                }
            }
            else if (stage == Stage.Eightfinal)
            {
                if (matchOutcome == ScoreEnum.CorrectOutcome)
                {
                    score = TyperScores.EightfinalCorrectWinnerOrDraw;
                }
                else if (matchOutcome == ScoreEnum.CorrectScoreBet)
                {
                    score = TyperScores.EightfinalExactScore;
                }
            }
            else if (stage == Stage.Quarterfinal)
            {
                if (matchOutcome == ScoreEnum.CorrectOutcome)
                {
                    score = TyperScores.QuarterfinalCorrectWinnerOrDraw;
                }
                else if (matchOutcome == ScoreEnum.CorrectScoreBet)
                {
                    score = TyperScores.QuarterfinalExactScore;
                }
            }
            else if (stage == Stage.Semifinal)
            {
                if (matchOutcome == ScoreEnum.CorrectOutcome)
                {
                    score = TyperScores.SemifinalWinnerOrDraw;
                }
                else if (matchOutcome == ScoreEnum.CorrectScoreBet)
                {
                    score = TyperScores.SemifinalExactScore;
                }
            }
            else if (stage == Stage.Final)
            {
                if (matchOutcome == ScoreEnum.CorrectOutcome)
                {
                    score = TyperScores.FinalCorrectWinnerOrDraw;
                }
                else if (matchOutcome == ScoreEnum.CorrectScoreBet)
                {
                    score = TyperScores.FinalExactScore;
                }
            }

            return (int)score;
        }
    }
}
