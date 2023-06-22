import React from 'react';
import './App.css';
import WeatherComponent from './WeatherComponent/WeatherComponent';

function App() {

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <WeatherComponent />
    </div>
  );
}

export default App;
