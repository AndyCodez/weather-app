# Weather App Frontend

This is the frontend part of the Weather App built using Next.js with TypeScript and TailwindCSS. The app fetches weather data from the backend and displays current weather, a 3-day forecast, and additional weather details for a specified city.

Backend API can be found [here](https://github.com/AndyCodez/weather-app-backend).

![WeatherApp](https://github.com/user-attachments/assets/0d91dbb6-4dae-42d5-aff0-dba7d4c94017)


## Features

- Display current day's weather icon, temperature, weather description, date, and location.
- Show a 3-day weather forecast with temperature ranges.
- Display wind status and humidity information.
- Search for a city and display its weather information.
- Toggle between Celsius and Fahrenheit.

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: TailwindCSS with Ripple UI components
- **Data Fetching**: JavaScript Fetch API

## Setup
1. Clone the repo
2. Install dependencies
```
npm install
```
3. Environment Variables

Create a .env.local file in the root directory and add the following environment variable:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

4. Run the application

```
npm run dev
```
