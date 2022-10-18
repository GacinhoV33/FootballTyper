import './App.css';
// Components
import NavbarComp from './components/Navbar/NavbarComp';
import Homepage from './components/Homepage/Homepage';
import Footer from './components/Footer/Footer';
// Helpers & structures
// From Libraries
import { createContext, useEffect, useState } from 'react';
import {Router, Route, Routes } from 'react-router-dom';
import KnockoutStage from './components/KnockoutStage/KnockoutStage';
import GroupStage from './components/GroupStage/GroupStage';
import YourBets from './components/YourBets/YourBets';
import Ranking from './components/Ranking/Ranking';
import Statistics from './components/Statistics/Statistics';
import Rules from './components/Rules/Rules';
import Login from './components/Login/Login';
import Schedule from './components/Schedule/Schedule';
import { groupTableData } from './helpers/structures';
import Profil from './components/Profil/Profil';
// This component contains whole logic, all main components and it's the manager of whole application

export const AppCtx = createContext<any>('string');

function App() {
  const [dataGroupMatches, setdataGroupMatches] = useState<any | null>(null);
  const [dataTeams, setDataTeams] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const GroupMatches = await ( await fetch('/api/Matches/Group')).json()
      // const /api/Teams
      const data = await ( await fetch('/api/Teams')).json()

      setdataGroupMatches(convertMatchesToGroupFormat(GroupMatches))
      setDataTeams(convertTeamsToGroupFormat(data))
    }
      fetchData();
  }, []);

  return (
        
        <div className='app-body'>
          <NavbarComp/>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/knockout' element={<KnockoutStage/>}/>
            <Route path='/schedule' element={<Schedule/>}/>
            <Route path='/groupstage' element={dataTeams ? <GroupStage groupMatches={dataGroupMatches} dataTeams={dataTeams}/> : null}/>
            <Route path='/yourbets' element={<YourBets userName='testUser1'/>}/>
            <Route 
              path='/ranking' 
              element={
              <Ranking
                currentUserName="TestUser2" // TODO REMOVE 
                />
              }
            />
            <Route path='/statistics' element={<Statistics/>}/>
            <Route path='/rules' element={<Rules/>}/>
            <Route path='/Login' element={<Login/>} />  {/* #TODO think about login*/}
            <Route path='/profil' element={<Profil/>}/>
          </Routes>
          <Footer/>
        </div>
       
    

  );
}

function convertMatchesToGroupFormat(data: any) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let tab: any = [];
  for(let i = 0; i < 8; i++) {
    const result = data.filter((match: any) => match.group === letters[i])
    tab.push(result)
  }
  return tab
}

function convertTeamsToGroupFormat(data: any) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  let tab: any = [];
  for(let i = 0; i < 8; i++) {
    const result = data.filter((team: any) => team.group === letters[i])
    tab.push(result)
  }
  return tab
}

export interface Team{
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

export default App;
