
import React, { useState, useEffect } from 'react';
import Search from './components/search/Search';
import CurrentWeather from './components/current-weather/currentWeather.jsx';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api/api.js';
import Forecast from './components/forecast/forecast.jsx';
import Lottie from 'react-lottie';
import animationData from './assets/Mausam-final.json';
import './App.scss';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [animationVisible, setAnimationVisible] = useState(true);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setAnimationVisible(false);
    }, 2000);
  
    return () => {
      clearTimeout(animationTimeout);
    };
  }, []);

  const lottieOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
    },
  };
  
  const LottieAnimation = () => {
    const handleOverlayClick = (e) => {
      e.stopPropagation(); 
    };
    return (
      <div className={`lottie-container ${animationVisible ? 'visible' : 'hidden'}`} style={{ pointerEvents: animationVisible ? 'auto' : 'none' }}>
        {animationVisible && (
          <div className="lottie-overlay" onClick={handleOverlayClick}/>
        )}
        <Lottie
          options={lottieOptions}
          height="120vh"
          width="120vw"
        />
      </div>
    );
  };

  return (
    <div className="container">
      <LottieAnimation />
      {!animationVisible && (
      <div className="header">
        <a href="/">
        <img className='logo' src="/mausam-logo.png" alt="" />
        </a>
        <div className="search-container">
          <Search className="search" onSearchChange={handleOnSearchChange} />
        </div>
      </div>
      )}
      <div className='live-weather'>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>
      <div className='forecast-weather'>
      {forecast && <Forecast data={forecast}/>}
      </div>
    </div>
  );
}

export default App;