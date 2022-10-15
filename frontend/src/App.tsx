import './App.css';
import {Axios} from 'axios';
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
// This component contains whole logic, all main components and it's the manager of whole application

export const AppCtx = createContext<any>(null);


let dataContext = {
    AllMatches: null,
    GroupMatches: null,

};

const getTeamsData = (setTeamsData: React.Dispatch<React.SetStateAction<Team[] | null>>) => {
  // This function fetching data about teams, and create context for whole App
  let data = [null];
  fetch('/api/Teams/GetAll')
  .then(result => result.json())
  .then((output) => {
      setTeamsData(output);
      console.log('Output: ', output)
    }).catch(err => console.error(err))
}

const getContextData = () => {
  fetch('/api/Teams/GetAll')
  .then(result => result.json())
  .then((output) => {
      dataContext.AllMatches = output;
    }).catch(err => console.error(err))


  // This fetch get all matches in group stage
  fetch('/api/Match/GetGroupMatches')
  .then(result => result.json())
  .then((output) => {
      dataContext.GroupMatches = output;
    }).catch(err => console.error(err))
}



function App() {
  const [teamsData, setTeamsData] = useState<Team[] | null>(null);

  useEffect(() => {
    getTeamsData(setTeamsData)
    getContextData()
    console.log('It work')
  }
    , [])

  return (
      <AppCtx.Provider value={dataContext}>
        <div className='app-body'>
          <NavbarComp/>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/knockout' element={<KnockoutStage/>}/>
            <Route path='/schedule' element={<Schedule/>}/>
            <Route path='/groupstage' element={<GroupStage/>}/>
            <Route path='/yourbets' element={<YourBets/>}/>
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
          </Routes>
          <Footer/>
        </div>
      </AppCtx.Provider>
       
    

  );
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
}

export default App;
