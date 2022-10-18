import React from 'react';
import './MyBets.scss';
import MatchBet from '../../KnockoutStage/MatchBet/MatchBet'
// Data
import { dummyBet } from '../../../helpers/dummyData';
/* public class Bet
    {
        public int Id { get; set; }

        public bool HomeTeamWin { get; set; }

        [Range(0, 30, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
        public int HomeTeamScoreBet { get; set; }

        public bool AwayTeamWin { get; set; }

        [Range(0, 30, ErrorMessage = "Value for {0} must be between {1} and {2}.")]
        public int AwayTeamScoreBet { get; set; }

        public bool HomeAwayDrawn { get; set; }

        public float PointsFactor { get; set; } = 1;

        public int MatchId { get; set; }

        public Match Match { get; set; }

        public string BettorUserName { get; set; }

        public DateTime BetDate { get; set; }
        
        public bool? SuccessfulBet { get; set; }
    }
*/

export type Match = {}

export type Bet = {
    id: number,
    homeTeamWin: boolean,
    homeTeamScore: number,
    homeTeamScoreBet: number,
    awayTeamWin: boolean,
    awayTeamScore: number,
    awayTeamScoreBet: number,
    homeAwayDrawn: boolean,
    pointsFactor: number,
    matchId: number,
    match: Match,
    bettorUserName: string,
    betDate: string,
    successfulBet?: boolean
}

export interface MyBetsProps{
  userBetsData: Bet[],
}
  
const MyBets: React.FC<MyBetsProps> = ({userBetsData}) => {
    return (
      <div>
        {/* <MatchBet {...dummyData}/>
        <MatchBet {...dummyData}/>
        <MatchBet {...dummyData}/>
        <MatchBet {...dummyData}/>
        <MatchBet {...dummyData}/>
        <MatchBet {...dummyData}/> */}
      </div>
  
  
    )
  }

export default MyBets;

export const dummyBetData = [{
    id: 1,
    homeTeamWin: true,
    homeTeamScore: 1,
    homeTeamScoreBet: 2,
    awayTeamWin: false,
    awayTeamScore: 0,
    awayTeamScoreBet: 1,
    homeAwayDrawn: false,
    pointsFactor: 1.0,
    matchId: 21,
    match: {},
    bettorUserName: 'testUser1',
    betDate: '21-11-2022T17:00',
    successfulBet: true, 
},
{
  id: 2,
  homeTeamWin: false,
  homeTeamScore: 2,
  homeTeamScoreBet: 2,
  awayTeamWin: true,
  awayTeamScore: 3,
  awayTeamScoreBet: 3,
  homeAwayDrawn: false,
  pointsFactor: 1.0,
  matchId: 22,
  match: {},
  bettorUserName: 'testUser1',
  betDate: '22-11-2022T17:00',
  successfulBet: false, 
},
]

