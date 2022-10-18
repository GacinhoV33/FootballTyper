import React from 'react';
import './MyBets.scss';
import MatchBet from '../../KnockoutStage/MatchBet/MatchBet'
// Data
import { dummyBet } from '../../../helpers/dummyData';

export type Match = {} //TODO remove this - only for dev 

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
  allBets: Bet[] | null,
}
  
const MyBets: React.FC<MyBetsProps> = ({userBetsData, allBets}) => {
    console.log(allBets);  
  return (
      <div className='bet-body'>
        {allBets ? allBets.map(({id, homeTeamWin, homeTeamScore, homeTeamScoreBet, awayTeamWin, awayTeamScore, awayTeamScoreBet, homeAwayDrawn, pointsFactor, matchId, match, bettorUserName, betDate, successfulBet}, index) => (
            <div className='bet' key={id}>
                1 : 2 | your bet: {homeTeamScoreBet} : {awayTeamScoreBet}
            </div>     
        )) : null}
      </div>
    )}

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

