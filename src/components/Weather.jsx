import React, { useState, useEffect } from 'react';

const Weather = ({ selectedCity }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=26bab3efc877b9063db1407c6d7a655e`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    if (selectedCity) {
      fetchData();
    }
  }, [selectedCity]);

  if (!selectedCity || !weatherData) {
    return null;
  }

  return (
    <div>
      <h2>{weatherData.name}, {weatherData.sys.country}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Weather: {weatherData.weather[0].description}</p>
    </div>
  );
};

export default Weather;
