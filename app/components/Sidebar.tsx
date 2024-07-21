import React from 'react'

interface SidebarProps {
    currentWeatherData: WeatherData | null;
    units: string;
    city: string;
}

interface WeatherData {
    temp: number;
    description: string;
    date: string;
    icon: string;
}
const Sidebar = ({ currentWeatherData, units, city }: SidebarProps) => {
    return (
        <div className="md:w-1/4 bg-white shadow-md rounded-lg p-6 mb-4 md:mb-0 flex flex-col justify-center mt-16 md:mt-0">
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
    )
}

export default Sidebar
