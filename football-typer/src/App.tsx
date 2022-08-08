import './App.css';
// Components
import Navbar from './components/Navbar/Navbar';
import Homepage from './components/Homepage/Homepage';
import Footer from './components/Footer/Footer';
// Helpers & structures

// From Libraries
import { useState } from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
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


function App() {

  return (
        <div className='app-body'>
          <Navbar/>
          <div>SPACE</div>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/knockout' element={<KnockoutStage/>}/>
            <Route path='/schedule' element={<Schedule/>}/>
            <Route path='/groupstage' element={<GroupStage/>}/>
            <Route path='/yourbets' element={<YourBets/>}/>
            <Route path='/ranking' element={<Ranking/>}/>
            <Route path='/statistics' element={<Statistics/>}/>
            <Route path='/rules' element={<Rules/>}/>
            <Route path='/Login' element={<Login/>} />  {/* #TODO think about login*/}
          </Routes>
          <div>SPACE</div>

          <Footer/>
        </div>
    

  );
}

export default App;
