/**
 * @file Weather.js
 * @description React component to display weather information based on latitude and longitude using the OpenWeatherMap API.
 * @author Alexander Colpitts, Ashesh Pahari
 */
import React, { useState, useEffect } from "react";
import axios from "axios";

/**
 * Weather Component
 *
 * @param {Object} props - Component properties.
 * @param {number} props.lat - Latitude of the location.
 * @param {number} props.lon - Longitude of the location.
 * @returns {JSX.Element} A component displaying current weather and location name.
 */
const Weather = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "a4e6fe71ffee099c42d6f4423e41b57a";
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching the weather data", error);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  if (!weatherData) {
    return <p className="text-xs">Loading weather...</p>;
  }

  const temp = Math.round(weatherData.main.temp);
  const iconUrl = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  const locationName = weatherData.name;

  return (
    <div className="flex flex-col items-center space-y-0 leading-tight">
      <div className="flex items-center space-x-1">
        <img src={iconUrl} alt="Weather Icon" className="w-7 h-7 -my-1" />
        <span className="text-sm font-semibold">{temp}°C</span>
      </div>
      {locationName && (
        <span className="text-[10px] opacity-80 tracking-tight whitespace-nowrap">
          {locationName}
        </span>
      )}
    </div>
  );
};

export default Weather;


