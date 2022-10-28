import './App.scss';
// Components
import NavbarComp from './components/Navbar/NavbarComp';
import Homepage from './components/Homepage/Homepage';
import Footer from './components/Footer/Footer';
import KnockoutStage from './components/KnockoutStage/KnockoutStage';
import GroupStage from './components/GroupStage/GroupStage';
import YourBets from './components/YourBets/YourBets';
import Ranking from './components/Ranking/Ranking';
import Statistics from './components/Statistics/Statistics';
import Rules from './components/Rules/Rules';
import Login from './components/Login/Login';
import Profil from './components/Profil/Profil';
import LoadingLayout from './components/LoadingLayout/LoadingLayout';
import { Bet } from './components/YourBets/MyBets/MyBets';
// Helpers & structures
// From Libraries
import { createContext, useEffect, useState } from 'react';
import { Router, Route, Routes } from 'react-router-dom';

// This component contains whole logic, all main components and it's the manager of whole application
export const UserContext = createContext('userNotLogged');


function App() {
  const [dataGroupMatches, setdataGroupMatches] = useState<any | null>(null);
  const [dataTeams, setDataTeams] = useState<any | null>(null);
  const [allBets, setAllBets] = useState<Bet[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {

      // const GroupMatches = await (await fetch('https://football-typer-api.azurewebsites.net/api/Matches/Group')).json();
      // // const /api/Teams
      // const data = await (await fetch('https://football-typer-api.azurewebsites.net/api/Teams')).json();
      // const allBets = await (await fetch('https://football-typer-api.azurewebsites.net/api/Bets')).json();

      const GroupMatches = await (await fetch('api/Matches/Group')).json();
      // const /api/Teams
      const data = await (await fetch('api/Teams')).json();
      const allBets = await (await fetch('api/Bets')).json();

      setdataGroupMatches(convertMatchesToGroupFormat(GroupMatches));
      setDataTeams(convertTeamsToGroupFormat(data));
      setAllBets(allBets);
      console.log(allBets);
    }
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={'user123'}>
    <div className='app-body'>
      <NavbarComp />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/knockout' element={<KnockoutStage />} />
        <Route path='/groupstage' element={dataTeams ? <GroupStage groupMatches={dataGroupMatches} dataTeams={dataTeams} /> : <LoadingLayout componentName='Group Stage'/>} />
        <Route path='/yourbets' element={allBets ? <YourBets userName='testUser1' allBets={allBets} /> : <LoadingLayout componentName='My bets'/>} />  {/* in future remove allBets because of huge number of bets!!! TODO*/}
        <Route
          path='/ranking'
          element={
            <Ranking
              allUsers={dummyData}
            />
          }
        />
        <Route path='/statistics' element={<Statistics />} />
        <Route path='/rules' element={<Rules />} />
        <Route path='/Login' element={<Login />} /> 
        <Route path='/profil' element={<Profil />} />
      </Routes >
      <Footer />
    </div >
    </UserContext.Provider>
  );
}

function convertMatchesToGroupFormat(data: any) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let tab: any = [];
  for (let i = 0; i < 8; i++) {
    const result = data.filter((match: any) => match.group === letters[i])
    tab.push(result)
  }
  return tab
}

function convertTeamsToGroupFormat(data: any) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let tab: any = [];
  for (let i = 0; i < 8; i++) {
    const result = data.filter((team: any) => team.group === letters[i])
    tab.push(result)
  }
  return tab
}

export interface Team {
  id: string,
  name: string,
  coach: null | string,
  points: number,
  playedMatchesNbr: number,
  win: number,
  drawn: number,
  lost: number,
  group: string,
}

export interface Match {
  id: number,
  homeTeam: Team,
  awayTeam: Team,
  homeTeamScore: number,
  awayTeamScore: number,
  group: string,
  location: string,
  date: string,
  referee: string,
  town: string,
  matchNumber: number,
  roundNumber: number,
  isMatchValid: boolean,
}


export interface User{
  name: string,
  // email: string, TODO?
  imgLink: string, //TODO?  
  totalPoints: number,
  totalExactScoreBet: number,
  totalCorrectWinnerBet: number,
  totalWrongBet: number,
  leauges: string[],
  id: number,
  lastFiveBets: number[],
}

export default App;
export const dummyData: User[] = [
  {
    name: 'user123',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 50,
    totalExactScoreBet: 1,
    totalCorrectWinnerBet: 5,
    totalWrongBet: 6,
    leauges: ['main', 'clownLeauge'],
    id: 21312,
    lastFiveBets: [2, 1, 0, 0, 1],
  },
  {
    name: 'user13',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 30,
    totalExactScoreBet: 2,
    totalCorrectWinnerBet: 0,
    totalWrongBet: 6,
    leauges: ['main'],
    id: 21312,
    lastFiveBets: [2, 1, 0, 0, 1],
  },
  {
    name: 'user1111',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 31,
    totalExactScoreBet: 2,
    totalCorrectWinnerBet: 1,
    totalWrongBet: 14,
    leauges: ['main'],
    id: 21313,
    lastFiveBets: [2, 1, 0, 0, 1],
  },
  {
    name: 'user1',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 11,
    totalExactScoreBet: 2,
    totalCorrectWinnerBet: 5,
    totalWrongBet: 6,
    leauges: ['main', 'clownLeauge'],
    id: 21314,
    lastFiveBets: [2, 1, 0, 0, 1],
  },
  {
    name: 'user1',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 24,
    totalExactScoreBet: 2,
    totalCorrectWinnerBet: 4,
    totalWrongBet: 6,
    leauges: ['main',],
    id: 21315,
    lastFiveBets: [2, 1, 0, 0, 1],
  },
  {
    name: 'user1',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 50,
    totalExactScoreBet: 3,
    totalCorrectWinnerBet: 5,
    totalWrongBet: 6,
    leauges: ['main', 'clownLeauge'],
    id: 21316,
    lastFiveBets: [2, 1, 0, 0, 1],
  },
  {
    name: 'user1',
    // email: string, TODO?
    imgLink: 'imgPath', //TODO?  
    totalPoints: 54,
    totalExactScoreBet: 1,
    totalCorrectWinnerBet: 3,
    totalWrongBet: 1,
    leauges: ['main', 'clownLeauge'],
    id: 21317,
    lastFiveBets: [2, 1, 0, 0, 1],
  },
]