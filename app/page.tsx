"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [city, setCity] = useState('Nairobi');
  const [units, setUnits] = useState('metric');
  const [currentWeatherData, setCurrentWeatherData] = useState<any>();
  const [forecastData, setForecastData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeatherForCity();
  }, [units]);

  const fetchWeatherForCity = async () => {
    if (!city) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:8000/api/weather?city=${city}&units=${units}`);
      const data = await response.json();

      console.log(data);
      updateWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const updateWeatherData = (weatherData: any) => {
    setCurrentWeatherData(weatherData.current_weather);
    setForecastData(weatherData.forecast);
  };

  if (loading) {
    return "Loading weather data...";
  }

  return (
    <div className="flex flex-col md:flex-row min-h-svh">
      {/* Sidebar for current weather details */}
      <div className="md:w-1/4 shadow-md rounded-lg p-4 mb-4 md:mb-0">
        <h2 className="text-lg font-semibold mb-2">Current Weather</h2>
        {currentWeatherData && (
          <div>
            <img
              src={`http://openweathermap.org/img/wn/${currentWeatherData.icon}.png`}
              alt={currentWeatherData.description}
              className="h-12 w-12"
            />
            <p className="font-medium">{currentWeatherData.temp}&#176;{units === 'metric' ? 'C' : 'F'}</p>
            <p>Temperature: {currentWeatherData.description}</p>
          </div>
        )}
      </div>

      {/* Main section with search and weather forecast */}
      <div className="md:w-3/4 flex flex-col bg-white shadow-md rounded-lg p-4">
        <div className="navbar">
          <div className="navbar-start">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search city..."
              className="input input-primary w-full"
            />
            <button
              onClick={fetchWeatherForCity}
              className="btn btn-primary mt-2"
            >
              GO
            </button>
            {error && <p className="text-error mt-2">{error}</p>}
          </div>


          <div className="btn-group btn-group-scrollable">
            <input type="radio" name="options" data-content="&#176;C" className={units === 'metric' ? `btn btn-active` : 'btn'} onClick={() => setUnits('metric')} />
            <input type="radio" name="options" data-content="&#176;F" className={units === 'imperial' ? `btn btn-active` : 'btn'} onClick={() => setUnits('imperial')} />
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Forecast Data</h2>
          {/* Render forecast data here */}
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Current Wind and Humidity</h2>
          {/* Render wind and humidity data here */}
        </div>
      </div>
    </div>
  );
}
