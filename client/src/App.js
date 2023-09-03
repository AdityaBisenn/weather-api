import React, { useState } from 'react';

function App() {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [error, setError] = useState('');

  const handleCityInputChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleGetWeather = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cities: cityInput.split(',').map((city) => city.trim()) }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data.weather);
      setError('');
    } catch (err) {
      console.error(err);
      setWeatherData({});
      setError('Error: Failed to fetch weather data');
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleGetWeather}>
        <label>
          Enter city names separated by commas (e.g. London, Tokyo): 
        </label>
          <input type="text" value={cityInput} onChange={handleCityInputChange} required />
          <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      <div className="weather-results">
        <h2>Weather Results:</h2>
        <ul>
          {Object.entries(weatherData).map(([city, temperature]) => (
            <li key={city}>
              {city}: {temperature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
