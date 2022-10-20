import React from 'react';
import './MyBets.scss';
// Data
import { dummyBet } from '../../../helpers/dummyData';
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

export interface MyBetsProps{
  userBetsData: Bet[] | null,
  allBets: Bet[] | null,
}
  
const MyBets: React.FC<MyBetsProps> = ({userBetsData, allBets}) => {
  console.log('This is data from MyBets Comp: ', userBetsData);  
  return (
      <div className='bet-body'>
        {userBetsData ? userBetsData.map((bet, index) => (
            <BetCard bet={bet} gridId={{row: Math.floor(index /4), column: index % 4}} key={index}/>
        )) : null}
      </div>
    )}

export default MyBets;


// Remove 
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

let CountryDict = new Map<string , string>();
CountryDict.set('Ecuador', 'ec')
CountryDict.set('Netherlands', 'nl')
CountryDict.set('Qatar', 'qa')
CountryDict.set('Senegal', 'sn')
CountryDict.set('Poland', 'pl')
CountryDict.set('England', 'gb') // todo xXD 
CountryDict.set('Wales', 'gb-wls')
CountryDict.set('Argentina', 'ar')
CountryDict.set('Mexico', 'mx')
CountryDict.set('Saudi Arabia', 'sa')
CountryDict.set('Tunisia', 'tn')
CountryDict.set('Iran', 'ir')
CountryDict.set('France', 'fr')
CountryDict.set('Australia', 'au')
CountryDict.set('Germany', 'de')
CountryDict.set('Japan', 'jp')
CountryDict.set('Spain', 'es')
CountryDict.set('Costa Rica', 'cr')
CountryDict.set('Morocco', 'ma')
CountryDict.set('Croatia', 'hr')
CountryDict.set('Belgium', 'be')
CountryDict.set('Canada', 'ca')
CountryDict.set('Switzerland', 'ch')
CountryDict.set('Brazil', 'br')
CountryDict.set('Serbia', 'rs')
CountryDict.set('Cameroon', 'cm')
CountryDict.set('Uruguay', 'uy')
CountryDict.set('Korea Republic', 'kr')
CountryDict.set('Portugal', 'pt')
CountryDict.set('Ghana', 'gh')
CountryDict.set('USA', 'us')
CountryDict.set('Greece', 'gr')
CountryDict.set('Denmark', 'dk')
CountryDict.set('Greece', 'gr')