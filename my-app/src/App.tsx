import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [inputText, setInputText] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    console.log(inputText);
    setInputText(''); // Text alanını temizle
  };

  return (
    <div className="App">
      <header className="App-header">
        <input className='text'
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Birşeyler yaz..."
        />
        <button className="button" onClick={handleSubmit}>Gönder</button>
      </header>
    </div>
  );
}

export default App;
