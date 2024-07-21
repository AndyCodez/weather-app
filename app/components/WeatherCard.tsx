import React from 'react'

interface WeatherCardProps {
    forecastData: Array<{
        date: string;
        icon: string;
        description: string;
        tempMin: number;
        tempMax: number;
    }>;
    units: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ forecastData, units }: WeatherCardProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {forecastData.map((data) => (
                <div key={data.date} className="bg-gray-50 p-4 rounded-lg shadow-md text-center">
                    <p className="font-semibold">{new Date(data.date).toLocaleDateString()}</p>
                    <img
                        src={`http://openweathermap.org/img/wn/${data.icon}.png`}
                        alt={data.description}
                        className="h-16 w-16 mx-auto"
                    />
                    <p className="capitalize mt-2">{data.description}</p>
                    <p>
                        {data.tempMin} - {data.tempMax}&#176;{units === 'metric' ? 'C' : 'F'}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default WeatherCard
