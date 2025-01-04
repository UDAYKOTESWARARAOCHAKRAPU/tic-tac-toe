import React from 'react';
import { Link } from 'react-router-dom';

import "../Css/Home.css";

export const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="home-hero">
          <h1 className="home-title">Welcome to Tic-Tac-Toe</h1>
          <div className="button-container">
            <Link to="/playervsplayer">
              <button className="home-button">Player Vs Player</button>
            </Link>
            <Link to="/playervscomputer">
              <button className="home-button">Player Vs Computer</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
