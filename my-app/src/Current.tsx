import React, { useState, useEffect } from 'react';
import './App.css';

function CurrentPage() {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<{ text: string, isUser: boolean }[]>([]);
  const [placeholder, setPlaceholder] = useState<string>('Type something...');
  const [characterPosition, setCharacterPosition] = useState(50);
  const [obstacles] = useState<number[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    if (inputText.trim() !== '') {
      // Kullanıcı mesajını ekleyin
      // Bot cevabını ekleyin
      setMessages(prevMessages => [...prevMessages, { text: inputText, isUser: true }, { text: 'Bot response goes here...', isUser: false }]);
      setInputText('');
      setPlaceholder('Type something...');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleFocus = () => {
    if (inputText.trim() === '') {
      setPlaceholder('');
    }
  };

  const handleBlur = () => {
    if (inputText.trim() === '') {
      setPlaceholder('Type something...');
    }
  };

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

  const renderObstacles = () => {
    return obstacles.map((position, index) => (
      <div key={index} className="obstacle" style={{ left: `${position}px` }}></div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="chat-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
              <div className="message-content">{message.text}</div>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
          />
          <button onClick={handleSubmit}>Send</button>
        </div>
      
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
        <div className="cloud cloud4"></div>

        {renderObstacles()}
      </header>
    </div>
  );
}

export default CurrentPage;
