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
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
        <p>Loading weather data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar for current weather details */}
      <div className="md:w-1/4 bg-white shadow-md rounded-lg p-6 mb-4 md:mb-0">
        <h2 className="text-xl font-semibold mb-4 text-center">Current Weather</h2>
        {currentWeatherData && (
          <div className="text-center">
            <img
              src={`http://openweathermap.org/img/wn/${currentWeatherData.icon}.png`}
              alt={currentWeatherData.description}
              className="h-16 w-16 mx-auto"
            />
            <p className="text-2xl font-bold mt-2">{currentWeatherData.temp}&#176;{units === 'metric' ? 'C' : 'F'}</p>
            <p className="capitalize">{currentWeatherData.description}</p>
            <p>{new Date(currentWeatherData.date).toLocaleDateString()}</p>
            <p className="mt-2">{city}</p>
          </div>
        )}
      </div>

      {/* Main section with search and weather forecast */}
      <div className="md:w-3/4 flex flex-col bg-white shadow-md rounded-lg p-6">
        <div className="navbar">
          <div className="navbar-start">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search city..."
              className="input input-primary w-full max-w-xs"
            />
            <button
              onClick={fetchWeatherForCity}
              className="btn btn-primary ml-7"
            >
              GO
            </button>
          </div>
          {error && <p className="text-error mt-2">{error}</p>}

          <div className="btn-group btn-group-scrollable mt-4 md:mt-0">
            <input type="radio" name="options" data-content="&#176;C" className={units === 'metric' ? `btn btn-active` : 'btn'} onClick={() => setUnits('metric')} />
            <input type="radio" name="options" data-content="&#176;F" className={units === 'imperial' ? `btn btn-active` : 'btn'} onClick={() => setUnits('imperial')} />
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">3 Days Forecast</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {forecastData.map(data => (
              <div key={data.date} className="forecast-data bg-gray-50 p-4 rounded-lg shadow-md text-center">
                <p className="font-semibold">{new Date(data.date).toLocaleDateString()}</p>
                <img
                  src={`http://openweathermap.org/img/wn/${data.icon}.png`}
                  alt={data.description}
                  className="h-12 w-12 mx-auto"
                />
                <p className="capitalize mt-2">{data.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Current Wind and Humidity</h2>
          <div className="flex justify-evenly">
            {currentWeatherData && (
              <>
                <div className="misc-info text-center">
                  <h3 className="font-semibold">Wind Status</h3>
                  <p>{currentWeatherData.windSpeed} km/h</p>
                </div>
                <div className="misc-info text-center">
                  <h3 className="font-semibold">Humidity</h3>
                  <p>{currentWeatherData.humidity}%</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}
