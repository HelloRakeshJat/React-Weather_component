import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Spin, Input, Alert } from 'antd';

const WeatherComponent = () => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [hourlyData, setHourlyData] = useState([]);
  const dateObj = new Date(weatherData && weatherData.forecast && weatherData.forecast.forecastday[0].date);
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = weekdays[dateObj.getDay()];

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    axios
      .get(`https://api.weatherapi.com/v1/forecast.json?key=ee8ad90872a7451bac994150232206&q=${location}&days=3`)
      .then((response) => {
        const { forecast } = response.data;
        const hourlyDataForDay = forecast.forecastday[0].hour;
        setHourlyData(hourlyDataForDay);
        setWeatherData(response.data);
        setIconUrl(response.data.current.condition.icon);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className='weather-data'>
      <Input.Search
        placeholder="Enter location"
        className='search-data'
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        onChange={(e) => setLocation(e.target.value)}
      />

      {loading && <Spin size="large" />}

      {error && <Alert type="error" message={error} showIcon />}

      {hourlyData.length > 0 && weatherData && (
        <div>
          <h2>{weatherData.location.name}</h2>
          <p>Current temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          {iconUrl && <img src={iconUrl} alt="Weather icon" />}
          <h3>Hourly Weather Data for {weatherData.forecast.forecastday[0].date} {dayOfWeek}</h3>
          <ul className="hourly-list">
            {hourlyData.map((hourData) => (
              <li className="hourly-item">
                <p>{hourData.time.split(' ')[1]}</p>
                <img src={hourData.condition.icon} alt="Hourly Weather Icon" />
                <p>{hourData.temp_c}°C</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
