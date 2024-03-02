import React, { useRef, useEffect, useState } from 'react';
import './current-weather.scss';

const CurrentWeather = ({data}) => {
    const weatherRef = useRef(null);
  const [liveLocation, setLiveLocation] = useState(null);

  const handleLiveLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLiveLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting live location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

    return (
        <div className="weather" ref={weatherRef}>
            <div className="top">
                <img src={`icons/${data.weather[0].icon}.svg`} alt="weather" className='weather-icon' />
                <div className="parameter-row">
                        <p className='temperature'>{Math.round(data.main.temp)}°C</p>
                        <div className='temp-container'>
                            <img className='temp-icons' src="icons/pressure-low-alt.svg" alt="Min Temperature" />
                            <label className="min-temp">{Math.round(data.main.temp_min)}°C</label>
                            <img className='temp-icons' src="icons/pressure-high-alt.svg" alt="Max Temperature" />
                            <label className="max-temp">{Math.round(data.main.temp_max)}°C</label>
                        </div>
                    </div>
                <span>
                    <p className='city'>{data.city}</p>
                    <p className='weather-description'>{data.weather[0].description}</p>
                </span>
            </div>
            <div className="bottom">
                <div className="details">
                    <div className="parameter-row">
                        <span className="parameter-label">Feels like</span>
                        <span className="parameter-value"> {Math.round(data.main.feels_like)}°C</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Wind</span>
                        <span className="parameter-value"> {data.wind.speed} m/s</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Humidity</span>
                        <span className="parameter-value"> {data.main.humidity}%</span>
                    </div>
                    <div className="parameter-row">
                        <span className="parameter-label">Pressure</span>
                        <span className="parameter-value"> {data.main.pressure} hPa</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CurrentWeather;