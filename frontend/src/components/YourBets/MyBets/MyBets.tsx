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
  betResult: number
}

export interface MyBetsProps {
  allUserBets: Bet[],
  setUpdateBet: React.Dispatch<React.SetStateAction<number>>
}

const MyBets: React.FC<MyBetsProps> = ({ allUserBets, setUpdateBet }) => {
  return (
    <div className='bet-body'>
      {allUserBets.map((bet, index) => (
        <BetCard bet={bet} key={index}  setUpdateBet={setUpdateBet}/>
      ))}
    </div>
  )
}

export default MyBets;


