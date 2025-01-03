import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import { Home } from './Pages/Home';
import { PlayerVsPlayer } from './Pages/PlayerVsPlayer';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/playervsplayer' element={ <PlayerVsPlayer/> }/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
