import React, { useState, useEffect } from 'react';

function RandomColor() {
  const [color, setColor] = useState('green');
  const [history, setHistory] = useState(['green']);
  const [intervalId, setIntervalId] = useState(null);

  // Function to generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Change color function
  const changeColor = () => {
    const newColor = getRandomColor();
    setColor(newColor);
    setHistory((prevHistory) => [...prevHistory, newColor]);
  };

  // Undo last color change
  const undo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, history.length - 1);
      setHistory(newHistory);
      setColor(newHistory[newHistory.length - 1]);
    }
  };

  // Auto change color
  const startAutoChange = () => {
    if (!intervalId) {
      const id = setInterval(() => {
        changeColor();
      }, 1000); // Auto change every second
      setIntervalId(id);
    }
  };

  // Stop auto change
  const stopAutoChange = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      stopAutoChange();
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', margin: '20px', border: '1px solid #000', padding: '20px' }}>
      <h2>Random Color</h2>
      <div
        style={{
          width: '100px',
          height: '100px',
          backgroundColor: color,
          margin: '20px auto',
        }}
      />
      <div>
        <button onClick={changeColor}>Change Background Color</button>
        <button onClick={undo} disabled={history.length <= 1}>Undo</button>
        <button onClick={intervalId ? stopAutoChange : startAutoChange}>
          {intervalId ? 'Stop Auto Change' : 'Start Auto Change'}
        </button>
      </div>
      <h3>Current Color: <span style={{ color }}>{color}</span></h3>
      <h3>Color History:</h3>
      <ul>
        {history.map((col, index) => (
          <li key={index} style={{ color: col }}>
            {col}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RandomColor;
