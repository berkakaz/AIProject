import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CurrentPage from './Current';

function Home() {
  const [characterPosition, setCharacterPosition] = useState(50);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
          <button className="redirect-button">Go to Current Page</button>
        </Link>
        <div className="box"></div>
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
