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
import AdminPanel from './components/AdminPanel/AdminPanel';
import LoadingLayout from './components/LoadingLayout/LoadingLayout';
import { Bet } from './components/YourBets/MyBets/MyBets';
// Helpers & structures
// From Libraries
import { createContext, useContext, useEffect, useState } from 'react';
import { Router, Route, Routes } from 'react-router-dom';


export type UserLocalStorageData = {
  username: string,
  email: string,
  fullname: string,
  id: number,
  imgLink?: string,
  leauges?: string[],
}
// This component contains whole logic, all main components and it's the manager of whole application
export type UserStatus = {
  userLocalData: UserLocalStorageData ,
  isUserSigned: boolean,
}

const userObjInit: UserLocalStorageData | null = {
  username: 'no-user',
  email: 'no-email',
  fullname: 'no-fullname',
  id: 0,
  imgLink: 'none',
  leauges: ['none'],
}

export const UserContext = createContext<UserStatus>({ userLocalData: userObjInit, isUserSigned: false });

function App() {
  const [dataGroupMatches, setdataGroupMatches] = useState<any | null>(null);
  const [allTeams, setAllTeams] = useState<Team[] | null>(null)
  const [dataTeams, setDataTeams] = useState<any | null>(null);
  const [allUserBets, setAllUserBets] = useState<Bet[] | undefined>(undefined);
  const [allUsers, setAllUsers] = useState<User[] | null>(null);
  const [userStatus, setUserStatus] = useState<UserStatus>({
    userLocalData: localStorage.getItem('user') !== '' ? JSON.parse(localStorage.getItem('user') as string)  : userObjInit,
    isUserSigned: localStorage.getItem('user') !== '' ? true : false
  })
  useEffect(() => {
    const fetchData = async () => {

      // const GroupMatches = await (await fetch('https://football-typer-api.azurewebsites.net/api/Matches/Group')).json();
      // // const /api/Teams
      // const data = await (await fetch('https://football-typer-api.azurewebsites.net/api/Teams')).json();
      // const allBets = await (await fetch('https://football-typer-api.azurewebsites.net/api/Bets')).json();


      const allMatches = await (await fetch('api/Matches')).json(); 
      const data = await (await fetch('api/Teams')).json();
      const requestAllUsersOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}`
        }
      };
      const allUsers = await( await fetch('api/TyperUsers', requestAllUsersOptions)).json();
      const userName= JSON.parse(localStorage.getItem('user') as string);
      const allUserBets = await (await fetch(`api/Bets/User/${userName.username}`)).json(); 
      setAllUserBets(allUserBets);
      setAllTeams(data)
      setdataGroupMatches(convertMatchesToGroupFormat(allMatches));
      setDataTeams(convertTeamsToGroupFormat(data));
      setAllUsers(allUsers);
    }
    fetchData();

  }, []);

  const rankingReturn = () => {
    if(allUsers && userStatus.isUserSigned && Array.isArray(allUsers)){
      return  <Ranking allUsers={allUsers}/>
    }
    else if(allUsers && !userStatus.isUserSigned){
      return <h1>State when user not logged but want to see ranking</h1>
    }
    else{
      return <LoadingLayout componentName='Ranking'/>
    }
  }

  const groupStageReturn = () => {
    if(!userStatus.isUserSigned){
      return(
        <Login setUserStatus={setUserStatus} />
      )
    }
    else if(dataTeams){
      return(
        <GroupStage groupMatches={dataGroupMatches} dataTeams={dataTeams} />
      )
  }
    else{
      return(
        <LoadingLayout componentName='Group Stage' />
      )
    }
  }

  return (
    <UserContext.Provider value={userStatus}>
      <div className='app-body'>
        <NavbarComp />
        <Routes>
          <Route path='/' element={userStatus.isUserSigned ? <Homepage allTeams={allTeams}/> : <Login setUserStatus={setUserStatus} />} />
          <Route path='/knockout' element={userStatus.isUserSigned ? <KnockoutStage /> : <Login setUserStatus={setUserStatus} />} />
          <Route path='/groupstage' element={groupStageReturn()} />
          <Route path='/yourbets' element={allUserBets !== undefined ? <YourBets allUserBets={allUserBets} allUsers={allUsers}/> : <LoadingLayout componentName='My bets' />} />   {/* receive empty array from backend TODO*/}
          <Route
            path='/ranking'
            element={
              rankingReturn()
            }
          />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/rules' element={<Rules />} />
          <Route path='/adminpanel' element={<AdminPanel />} />
          <Route path='/Login' element={<Login setUserStatus={setUserStatus} />} />
        </Routes >
        {/* <Footer /> */}

      </div >
    </UserContext.Provider>
  );
}

function convertMatchesToGroupFormat(data: any) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let tab: any = [];
  for (let i = 0; i < 8; i++) {
    const result = data.filter((match: any) => match.group ? match.group[6] === letters[i] : false)
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


export interface User {
  username: string,
  // email: string, TODO?
  imgLink: string, //TODO?  
  totalPoints: number,
  totalExactScoreBets: number,
  totalCorrectWinnerBets: number,
  totalWrongBets: number,
  leauges: string[],
  id: number,
  lastFiveBets: string,
}

export default App;
// export const dummyData: User[] = [
//   {
//     name: 'user1234',
//     // email: string, TODO?
//     imgLink: 'imgPath', //TODO?  
//     totalPoints: 50,
//     totalExactScoreBet: 1,
//     totalCorrectWinnerBet: 5,
//     totalWrongBet: 6,
//     leauges: ['main', 'clownLeauge'],
//     id: 21312,
//     lastFiveBets: [2, 1, 0, 0, 1],
//   },
//   {
//     name: 'user13',
//     // email: string, TODO?
//     imgLink: 'imgPath', //TODO?  
//     totalPoints: 30,
//     totalExactScoreBet: 2,
//     totalCorrectWinnerBet: 0,
//     totalWrongBet: 6,
//     leauges: ['main'],
//     id: 21312,
//     lastFiveBets: [2, 1, 0, 0, 1],
//   },
//   {
//     name: 'user1111',
//     // email: string, TODO?
//     imgLink: 'imgPath', //TODO?  
//     totalPoints: 31,
//     totalExactScoreBet: 2,
//     totalCorrectWinnerBet: 1,
//     totalWrongBet: 14,
//     leauges: ['main'],
//     id: 21313,
//     lastFiveBets: [2, 1, 0, 0, 1],
//   },
//   {
//     name: 'user1',
//     // email: string, TODO?
//     imgLink: 'imgPath', //TODO?  
//     totalPoints: 11,
//     totalExactScoreBet: 2,
//     totalCorrectWinnerBet: 5,
//     totalWrongBet: 6,
//     leauges: ['main', 'clownLeauge'],
//     id: 21314,
//     lastFiveBets: [2, 1, 0, 0, 1],
//   },
//   {
//     name: 'user1',
//     // email: string, TODO?
//     imgLink: 'imgPath', //TODO?  
//     totalPoints: 24,
//     totalExactScoreBet: 2,
//     totalCorrectWinnerBet: 4,
//     totalWrongBet: 6,
//     leauges: ['main',],
//     id: 21315,
//     lastFiveBets: [2, 1, 0, 0, 1],
//   },
//   {
//     name: 'user1',
//     // email: string, TODO?
//     imgLink: 'imgPath', //TODO?  
//     totalPoints: 50,
//     totalExactScoreBet: 3,
//     totalCorrectWinnerBet: 5,
//     totalWrongBet: 6,
//     leauges: ['main', 'clownLeauge'],
//     id: 21316,
//     lastFiveBets: [2, 1, 0, 0, 1],
//   },
//   {
//     name: 'user1',
//     // email: string, TODO?
//     imgLink: 'imgPath', //TODO?  
//     totalPoints: 54,
//     totalExactScoreBet: 1,
//     totalCorrectWinnerBet: 3,
//     totalWrongBet: 1,
//     leauges: ['main', 'clownLeauge'],
//     id: 21317,
//     lastFiveBets: [2, 1, 0, 0, 1],
//   },
// ]
