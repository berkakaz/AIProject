import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CurrentPage from './Current';

function Home() {
  const [characterPosition, setCharacterPosition] = useState(50);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  let audio: HTMLAudioElement | null = null;

  useEffect(() => {
    const moveRightInterval = setInterval(() => {
      setCharacterPosition(prevPosition => {
        const newPosition = prevPosition + 10;
        if (newPosition >= windowWidth) {
          return 50;
        }
        return newPosition;
      });
    }, 100);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(moveRightInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);

  const playMusic = () => {
    setIsMusicPlaying(true);
    audio = new Audio('/Super Mario Bros. medley.mp3');
    audio.loop = true;
    audio.play();
  };

  const stopMusic = () => {
    setIsMusicPlaying(false);
    if (audio) {
      audio.pause();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="image"></div>
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
        <div className="cloud cloud4"></div>
        <div className="character" style={{ left: `${characterPosition}px` }}></div>
        <Link to="/current-page">
          <button className="super-mario-start-button">START</button>
        </Link>
        <div className="box"></div>
        <button className="music-button" onClick={isMusicPlaying ? stopMusic : playMusic}>
          {isMusicPlaying ? 'Stop Music' : 'Play Music'}
        </button>
      </header>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/current-page" element={<CurrentPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
