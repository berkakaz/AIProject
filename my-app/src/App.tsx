import React, { useState, useEffect } from 'react';
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

  const [characterPosition, setCharacterPosition] = useState(50); // Mario'nun başlangıç pozisyonu
  const [obstacles, setObstacles] = useState<number[]>([]); // Engellerin pozisyonlarını saklamak için bir dizi
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Pencere genişliğini izlemek için state

  useEffect(() => {
    // Mario'nun düzenli aralıklarla sağa doğru hareket etmesini sağlar
    const moveRightInterval = setInterval(() => {
      setCharacterPosition(prevPosition => {
        // Karakterin sağa doğru hareketi
        const newPosition = prevPosition + 10; // Sağa doğru 10 birim hareket
        // Eğer karakter sağ kenara ulaştıysa, başlangıç pozisyonuna geri döndür
        if (newPosition >= windowWidth) {
          return 50;
        }
        return newPosition;
      });
    }, 100); // Her 100ms'de bir hareket

    // Pencere boyutu değiştiğinde, pencere genişliğini güncelle
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize); // Pencere boyutu değişikliğini dinle

    // Temizlik: Komponent kaldırıldığında aralık temizlenir ve pencere boyutu dinleyicisi kaldırılır
    return () => {
      clearInterval(moveRightInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]); // windowWidth değiştiğinde yeniden çalışır

  // Engelleri oluşturmak için map fonksiyonunu kullanıyoruz
  const renderObstacles = () => {
    return obstacles.map((position, index) => (
      <div key={index} className="obstacle" style={{ left: `${position}px` }}></div>
    ));
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

        {/* Mario karakteri */}
        <div className="character" style={{ left: `${characterPosition}px` }}></div>

        {/* Engelleri render etmek için */}
        {renderObstacles()}
      </header>
    </div>
  );
}

export default App;
