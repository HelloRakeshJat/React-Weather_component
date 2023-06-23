import React, { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Spin, Input, Alert, Tabs } from 'antd';

const { TabPane } = Tabs;

const WeatherComponent = () => {
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [hourlyData, setHourlyData] = useState([]);

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

  const renderHourlyData = (dataKey, unit) => {
    return (
      <div className="hourly-list">
        {hourlyData.map((hourData) => (
          <div className="hourly-item" key={hourData.time}>
            <p>{hourData.time.split(' ')[1]}</p>
            <img src={hourData.condition.icon} alt="Hourly Weather Icon" />
            <p>{hourData[dataKey]} {unit}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="weather-data">
      <Input.Search
        placeholder="Enter location"
        className="search-data"
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
          <h3>
            Hourly Weather Data for {weatherData.forecast.forecastday[0].date} {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
          </h3>
          <Tabs defaultActiveKey="temperature">
            <TabPane tab="Temperature" key="temperature">
              {renderHourlyData('temp_c', '°C')}
            </TabPane>
            <TabPane tab="Precipitation" key="precipitation">
              {renderHourlyData('humidity', '%')}
            </TabPane>
            <TabPane tab="Wind" key="wind">
              {renderHourlyData('wind_kph', 'km/h')}
            </TabPane>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
