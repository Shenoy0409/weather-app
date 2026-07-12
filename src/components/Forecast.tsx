type ForecastProps = {
    forecast: any
    getWeatherIcon: (code: number) => string
    formatDay: (date: string, index: number) => string
  }
  
  function Forecast({
    forecast,
    getWeatherIcon,
    formatDay,
  }: ForecastProps) {
    return (
      <div className="forecast">
        <h3>5-Day Forecast</h3>
  
        <div className="forecast-days">
          {forecast.time.map((day: string, index: number) => (
            <div key={day} className="forecast-day">
              <div className="forecast-icon">
                {getWeatherIcon(forecast.weather_code[index])}
              </div>
  
              <p>{formatDay(day, index)}</p>
  
              <p>⬆️ {forecast.temperature_2m_max[index]}°C</p>
              <p>⬇️ {forecast.temperature_2m_min[index]}°C</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  export default Forecast