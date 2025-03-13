import React, { useState, useEffect } from "react";

const Weather = ({ lat, lon }) => {
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    async function fetchWeather() {
        try {
            const url = "https://api.open-meteo.com/v1/forecast";
            const params = {
                current_weather: true,
                hourly: "temperature_2m",
                temperature_unit: "fahrenheit",
                latitude: lat,
                longitude: lon
            };

            // Function to construct the query string from the params object
            const constructUrlWithParams = (baseUrl, params) => {
            const urlParams = new URLSearchParams(params);
            return `${baseUrl}?${urlParams.toString()}`;
            };

            // Full URL with parameters
            const fullUrl = constructUrlWithParams(url, params);
            console.log(fullUrl)
            const response = await fetch(fullUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setWeather(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWeather();
    }, [lat, lon]);

  if (loading) return <p>Loading weather...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Weather</h2>
      <button onClick={fetchWeather}>Get Weather</button>
      {weather && (
        <div>
          {weather.hourly && weather.hourly.time.map((time, index) => {
            
            const unit = weather.hourly_units.temperature_2m;
            const temp = weather.hourly.temperature_2m[index];

            const [date, hour] = time.split("T");
            return (
                <p key={index}>{hour}: {temp}{unit}</p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Weather;
