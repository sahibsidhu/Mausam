import React from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import './forecast.scss';

const WEEK_DAYS = [
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday', 
    'Sunday'
];

const Forecast = ({data}) => {
    const getWeekDay = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(getWeekDay, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, getWeekDay));

    return (
        <>
            <label className='title'>Daily Forecast</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className='daily-item'>
                                    <img src={`icons/${item.weather[0].icon}.svg`} alt="weather" className='icons-small' />
                                    <label className="day">{forecastDays[idx]}</label>
                                    <label className="description">{item.weather[0].description}</label>
                                    <label className="min-temp">{Math.round(item.main.temp_min)}°C /</label>
                                    <label className="max-temp">{Math.round(item.main.temp_max)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className="daily-details-grid">
                            <div className="daily-details-grid-item">
                                <label>Pressure</label>
                                <label>{item.main.pressure}hPa</label>
                            </div>
                            <div className="daily-details-grid-item">
                                <label>Humidity</label>
                                <label>{item.main.humidity}%</label>
                            </div>
                            <div className="daily-details-grid-item">
                                <label>Clouds</label>
                                <label>{item.clouds.all}%</label>
                            </div>
                            <div className="daily-details-grid-item">
                                <label>Wind Speed</label>
                                <label>{item.wind.speed} m/s</label>
                            </div>
                            <div className="daily-details-grid-item">
                                <label>Sea Level</label>
                                <label>{item.main.sea_level}m</label>
                            </div>
                            <div className="daily-details-grid-item">
                                <label>Feels like:</label>
                                <label>{item.main.feels_like}°C</label>
                            </div>
                        </div>
                    </AccordionItemPanel>
                    </AccordionItem>
                ))}
                </Accordion>
        </>
    );
};

export default Forecast;