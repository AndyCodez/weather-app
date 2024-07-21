"use client";
import { useEffect, useState } from "react";
import WeatherInput from "./components/WeatherInput";
import WeatherCard from "./components/WeatherCard";

interface WeatherData {
  current_weather: {
    icon: string;
    description: string;
    temp: number;
    date: string;
    windSpeed: number;
    windDegrees: number;
    windDirection: string;
    humidity: number;
  };
  forecast: Array<{
    date: string;
    icon: string;
    description: string;
    tempMin: number;
    tempMax: number;
  }>;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [city, setCity] = useState('Nairobi');
  const [citySearch, setCitySearch] = useState('Nairobi');
  const [units, setUnits] = useState('metric');
  const [currentWeatherData, setCurrentWeatherData] = useState<WeatherData['current_weather'] | null>(null);
  const [forecastData, setForecastData] = useState<WeatherData['forecast']>([]);
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
      const response = await fetch(`${apiUrl}/api/weather?city=${citySearch}&units=${units}`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data: WeatherData = await response.json();
      setCity(citySearch);
      updateWeatherData(data);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const updateWeatherData = (weatherData: WeatherData) => {
    setCurrentWeatherData(weatherData.current_weather);
    setForecastData(weatherData.forecast);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading weather data...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar for current weather details */}
      <div className="md:w-1/4 bg-white shadow-md rounded-lg p-6 mb-4 md:mb-0 flex flex-col justify-center">
        <h2 className="text-xl font-semibold mb-4 text-center">Current Weather</h2>
        {currentWeatherData && (
          <div className="text-center grid grid-flow-row gap-7">
            <img
              src={`http://openweathermap.org/img/wn/${currentWeatherData.icon}.png`}
              alt={currentWeatherData.description}
              className="h-16 w-16 mx-auto"
            />
            <div>
              <p className="text-2xl font-bold">
                {currentWeatherData.temp}&#176;{units === 'metric' ? 'C' : 'F'}
              </p>
              <p className="capitalize">{currentWeatherData.description}</p>
              <p>{new Date(currentWeatherData.date).toLocaleDateString()}</p>
              <p className="mt-2">{city}</p>
            </div>
          </div>
        )}
      </div>

      {/* Main section with search and weather forecast */}
      <div className="md:w-3/4 flex flex-col bg-white shadow-md rounded-lg p-6">
        <WeatherInput
          citySearch={citySearch}
          onCitySearchChange={(e) => setCitySearch(e.target.value)}
          onFetchWeather={fetchWeatherForCity}
          units={units}
          onUnitsChange={setUnits}
          error={error}
        />

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">3 Days Forecast</h2>
          <WeatherCard forecastData={forecastData} units={units} />
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4 text-center">Current Wind and Humidity</h2>
          <div className="flex justify-evenly">
            {currentWeatherData && (
              <>
                <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center w-[180px]">
                  <h3 className="font-semibold my-2">Wind Status</h3>
                  <p>{currentWeatherData.windSpeed} km/h</p>
                  <div className="flex mt-2 justify-center">
                    <svg
                      className="w-8 h-8 transform"
                      style={{ transform: `rotate(${currentWeatherData.windDegrees}deg)` }}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l-7-7 7-7"
                      />
                    </svg>
                    <p>{currentWeatherData.windDirection}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-md text-center w-[180px]">
                  <h3 className="font-semibold my-2">Humidity</h3>
                  <p className="mb-1">{currentWeatherData.humidity}%</p>
                  <progress className="progress" value={currentWeatherData.humidity} max="100"></progress>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
