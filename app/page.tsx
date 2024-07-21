"use client"
import { useState } from "react";

export default function Home() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherForCity = async () => {
    console.log("searching city");

    try {
      const response = await fetch(`http://localhost:8000/api/weather?city=${city}`);
      const data = await response.json();

      console.log(data)
      setWeatherData(data);
    } catch (err) {
      console.log("Error fetching weather");
    }
  }

  return (
    <div className="search-section">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city ..."
      />

      <button onClick={fetchWeatherForCity}>GO</button>
    </div>
  )
}
