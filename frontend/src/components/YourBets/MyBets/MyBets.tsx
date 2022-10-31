import React from 'react';
import './MyBets.scss';
// Data
import { Match } from '../../../App';
import BetCard from './BetCard';

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

export interface MyBetsProps {
  userBetsData: Bet[],
  allBets: Bet[],
}

const MyBets: React.FC<MyBetsProps> = ({ userBetsData, allBets }) => {
  return (
    <div className='bet-body'>
      {userBetsData.map((bet, index) => (
        <BetCard bet={bet} key={index} />
      ))}
    </div>
  )
}

export default MyBets;


