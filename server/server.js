const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());


const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';

app.post('/', async (req, res) => {
  try {
    const { cities } = req.body;
    const weatherData = {};

    for (const city of cities) {
      const response = await axios.get(weatherApiUrl, {
        params: {
          q: city,
          units: 'metric',
          appid: 'b9874840abbc083331de48bed3816501',
        },
      });

      if (response.data.main && response.data.main.temp) {
        weatherData[city] = `${response.data.main.temp.toFixed(1)}C`;
      } else {
        weatherData[city] = 'N/A';
      }
    }

    res.json({ weather: weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
