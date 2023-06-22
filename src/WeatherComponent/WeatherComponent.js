import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Spin, Input, Alert } from 'antd';

const WeatherComponent = (props) => {
  console.log("WeatherComponent props ==>", props)
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (weatherData) {
      fetchImage(weatherData.current.condition.text);
    }

  }, [weatherData]);

  const fetchImage = (query) => {
    const unsplashAccessKey = '2Z2_-VGs_juiK4R1yd4INiG9inp17tbU6_BY0wDyy6o';
    axios
      .get(`https://api.unsplash.com/photos/random?query=${query}&client_id=${unsplashAccessKey}`)
      .then((response) => {
        const image = response.data.urls.regular;
        setImageUrl(image);
        console.log("fetch api imgae", image)
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    axios
      .get(`https://api.weatherapi.com/v1/current.json?key=ee8ad90872a7451bac994150232206&q=${location}`)
      .then((response) => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div>
      <Input.Search
        placeholder="Enter location"
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        onChange={(e) => setLocation(e.target.value)}
        style={{ width: 300, marginBottom: 16 }}
      />

      {loading && <Spin size="large" />}

      {error && <Alert type="error" message={error} showIcon />}

      {weatherData && (
        <div>
          <h2>{weatherData.location.name}</h2>
          <p>Current temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          {imageUrl && <img src={imageUrl} alt="Weather condition" style={{ maxWidth: '50%', maxHeight: '400px' }} />}
        </div>
      )}
    </div>
  )
};

export default WeatherComponent