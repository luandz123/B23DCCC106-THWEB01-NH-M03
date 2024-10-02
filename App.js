import React from 'react';
import TodoList from './todolist';
import ImageSearch from './ImageSeach';
import RandomColor from './randomcolor';

const App = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', gap: '20px' }}>
      <div style={{ flex: '1' }}>
        <TodoList />
      </div>
      <div style={{ flex: '1' }}>
        <ImageSearch />
      </div>
      <div style={{ flex: '1' }}>
        <RandomColor />
      </div>
    </div>
  );
};

export default App;