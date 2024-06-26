import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CurrentPage from './Current';

function Home() {
  const [characterPosition, setCharacterPosition] = useState(50);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const moveRightInterval = setInterval(() => {
      setCharacterPosition((prevPosition) => {
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
    if (audio) {
      audio.play();
    } else {
      const newAudio = new Audio('/Super Mario Bros. medley.mp3');
      newAudio.loop = true;
      newAudio.play();
      setAudio(newAudio);
    }
    setIsMusicPlaying(true);
  };

  const stopMusic = () => {
    if (audio) {
      audio.pause();
    }
    setIsMusicPlaying(false);
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      stopMusic();
    } else {
      playMusic();
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
        <button
          className={`super-mario-button music-button ${isMusicPlaying ? 'playing' : ''}`}
          onClick={toggleMusic}
        ></button>
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
