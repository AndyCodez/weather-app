import React from 'react'

interface WeatherInputProps {
    citySearch: string;
    onCitySearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFetchWeather: () => void;
    units: string;
    onUnitsChange: (units: string) => void;
    error: string | null;
}

const WeatherInput: React.FC<WeatherInputProps> = ({ citySearch, onCitySearchChange, onFetchWeather, units, onUnitsChange, error }: WeatherInputProps) => {
    return (
        <div className="navbar">
            <div className="navbar-start">
                <input
                    type="text"
                    value={citySearch}
                    onChange={onCitySearchChange}
                    placeholder="Search city..."
                    className="input input-primary w-full max-w-xs"
                />
                <button
                    onClick={onFetchWeather}
                    className="btn btn-primary ml-7"
                >
                    GO
                </button>
            </div>
            {error && <p className="text-error mt-2">{error}</p>}

            <div className="btn-group btn-group-scrollable mt-4 md:mt-0">
                <input
                    type="radio"
                    name="options"
                    data-content="&#176;C"
                    className={units === 'metric' ? `btn btn-active` : 'btn'}
                    onClick={() => onUnitsChange('metric')}
                />
                <input
                    type="radio"
                    name="options"
                    data-content="&#176;F"
                    className={units === 'imperial' ? `btn btn-active` : 'btn'}
                    onClick={() => onUnitsChange('imperial')}
                />
            </div>
        </div>
    )
}

export default WeatherInput
