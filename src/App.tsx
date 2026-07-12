import { useState } from 'react'
import './App.css'
import WeatherCard from './components/WeatherCard'
import Forecast from "./components/Forecast"

function App() {
  const [city, setCity] = useState('')
  const [cityName, setCityName] = useState('')
  const [message, setMessage] = useState('')
  const [weather, setWeather] = useState<any>(null)
  const [forecast, setForecast] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const fetchWeather = async (latitude: number, longitude: number) => {
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&forecast_days=5`
    )
  
    const weatherData = await weatherResponse.json()
    console.log(weatherData.daily)
    console.log(weatherData.current)
    setWeather(weatherData.current)
    setForecast(weatherData.daily)
    setMessage('')
    setLoading(false)
  }

  const handleSearch = async () => {
   if (city.trim() === '') {
    setMessage('Please enter a city.')
    return
   }
   setLoading(true)

  setMessage(`Searching for: ${city.trim()}`)
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city.trim()}&count=1`
  )
  const data = await response.json()

  if (!data.results || data.results.length === 0) {
    setMessage('❌ City not found.')
    setWeather(null)
    return
  }
  
  const location = data.results[0]
  setCityName(location.name)

  console.log(location)

  await fetchWeather(location.latitude, location.longitude)
}
const handleCurrentLocation = async () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      setCityName("Current Location")

await fetchWeather(
  position.coords.latitude,
  position.coords.longitude
)
    },
    (error) => {
      console.error(error)
      setMessage("Unable to get your location.")
    }
  )
}
const getWeatherIcon = (code: number) => {
  if (code === 0) return "☀️"
  if (code === 1 || code === 2) return "🌤️"
  if (code === 3) return "☁️"
  if (code === 45 || code === 48) return "🌫️"
  if (code >= 51 && code <= 67) return "🌧️"
  if (code >= 71 && code <= 77) return "❄️"
  if (code >= 80 && code <= 82) return "🌦️"
  if (code >= 95) return "⛈️"

  return "🌤️"
}
const formatDay = (date: string, index: number) => {
  if (index === 0) return "Today"
  if (index === 1) return "Tomorrow"

  return new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  })
}


  return (
    <section className="weather-app">
      <header className="weather-header">
        <h1>🌤 Weather Finder</h1>
        <p className="subtitle">Know the weather before you step outside.</p>
      </header>

      <div className="weather-card">
      <button
        type="button"
        className="btn btn-location"
        onClick={handleCurrentLocation}
>
  📍 Use Current Location
</button>

        <div className="divider">
          <span className="divider-line" />
          <span className="divider-text">OR</span>
          <span className="divider-line" />
        </div>

        <form
          className="search-form"
          onSubmit={(event) => {
            event.preventDefault()
            handleSearch()
          }}
        >
          <input
            type="text"
            className="search-input"
            placeholder="Enter city..."
            value={city}
            onChange={(event) => {
              console.log("Typing...", event.target.value)
            
              setCity(event.target.value)
              setMessage('')
            }}
          />
          <button type="submit" className="btn btn-search">
            Search
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        {loading && <p className="message">⏳ Loading weather...</p>}
        {weather && (
  <WeatherCard
    cityName={cityName}
    weather={weather}
    getWeatherIcon={getWeatherIcon}
    
    
  />
)}
{forecast && (
  <Forecast
    forecast={forecast}
    getWeatherIcon={getWeatherIcon}
    formatDay={formatDay}
  />
)}
      </div>
    </section>
  )
}

export default App