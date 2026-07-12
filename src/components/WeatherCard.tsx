type WeatherCardProps = {
    cityName: string
    weather: any
    getWeatherIcon: (code: number) => string
  }
  
  function WeatherCard({
    cityName,
    weather,
    getWeatherIcon,
  }: WeatherCardProps) {
    return (
      <div className="weather-result">
        <div className="weather-icon">
          {getWeatherIcon(weather.weather_code)}
        </div>
  
        <h2>📍 {cityName}</h2>
  
        <div className="temperature">
          {weather.temperature_2m}°C
        </div>
  
        <p>💧 Humidity: {weather.relative_humidity_2m}%</p>
        <p>💨 Wind: {weather.wind_speed_10m} km/h</p>
      </div>
    )
  }
  
  export default WeatherCard