import React, { useEffect, useState } from 'react';
import './App.css';
import WeatherComponent from './WeatherComponent/WeatherComponent';

function App() {
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

  const weatherComponents = [
    { id: 1, image: "https://i0.wp.com/evs-translations.com/blog/wp-content/uploads/2019/09/Foggy_EVS-Translations_AS_L_XS_137726792.jpg?w=389&ssl=1", },
    { id: 2, image: "https://st.depositphotos.com/1903923/1678/v/950/depositphotos_16785893-stock-illustration-sunny-day-background.jpg", },
    { id: 3, image: "https://st4.depositphotos.com/20524830/25866/i/1600/depositphotos_258667804-stock-photo-close-shot-picture-taken-aalesund.jpg" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentComponentIndex((prevIndex) => (prevIndex + 1) % weatherComponents.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      <h2>Image component will re-render over when img change</h2>
      <WeatherComponent image={weatherComponents[currentComponentIndex].image} />
    </div>
  );
}

export default App;
