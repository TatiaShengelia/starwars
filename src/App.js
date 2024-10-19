import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CharacterList from './CharacterList';
import CharacterView from './CharacterView';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CharacterList />} />
        <Route path="/character/:id" element={<CharacterView />} />
      </Routes>
    </div>
  );
}

export default App;
