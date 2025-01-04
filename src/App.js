import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { Home } from './Pages/Home';
import { PlayerVsPlayer } from './Pages/PlayerVsPlayer';
import { PlayerVsComputer } from './Pages/PlayerVsComputer';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/playervsplayer' element={ <PlayerVsPlayer/> }/>
          <Route path='/playervscomputer' element={ <PlayerVsComputer/> }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
