const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());

const OPENWEATHER_BASE = 'https://api.openweathermap.org';
const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

app.get('/api/weather/geocode', async (req, res) => {
    const { q, limit = 5 } = req.query;
    if (!q) return res.status(400).json({ error: 'Missing query param: q' });
    try {
        const url = `${OPENWEATHER_BASE}/geo/1.0/direct`;
        const result = await axios.get(url, {
            params: { q, limit, appid: OPENWEATHER_API_KEY }
        });
        res.json(result.data);
    } catch (err) {
        console.error('[geocode] error', err.response?.status, err.message);
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

app.get('/api/weather/current', async (req, res) => {
    const { lat, lon, units = 'metric' } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: 'Missing query params: lat, lon' });
    try {
        const url = `${OPENWEATHER_BASE}/data/2.5/weather`;
        const result = await axios.get(url, {
            params: { lat, lon, units, appid: OPENWEATHER_API_KEY }
        });
        res.json(result.data);
    } catch (err) {
        console.error('[current] error', err.response?.status, err.message);
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

app.get('/api/weather/forecast', async (req, res) => {
    const { lat, lon, units = 'metric' } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: 'Missing query params: lat, lon' });
    try {
        const url = `${OPENWEATHER_BASE}/data/2.5/forecast`;
        const result = await axios.get(url, {
            params: { lat, lon, units, appid: OPENWEATHER_API_KEY }
        });
        res.json(result.data);
    } catch (err) {
        console.error('[forecast] error', err.response?.status, err.message);
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});

app.get('/api/weather/air', async (req, res) => {
    const { lat, lon } = req.query;
    if (!lat || !lon) return res.status(400).json({ error: 'Missing query params: lat, lon' });
    try {
        const url = `${OPENWEATHER_BASE}/data/2.5/air_pollution`;
        const result = await axios.get(url, {
            params: { lat, lon, appid: OPENWEATHER_API_KEY }
        });
        res.json(result.data);
    } catch (err) {
        console.error('[air] error', err.response?.status, err.message);
        res.status(err.response?.status || 500).json({ error: err.message });
    }
});



app.listen(3000, () => {
    console.log("API ready -> http://localhost:3000");
    console.log(" - geocode  -> http://localhost:3000/api/weather/geocode?q=Paris");
    console.log(" - current  -> http://localhost:3000/api/weather/current?lat=48.8566&lon=2.3522");
    console.log(" - forecast -> http://localhost:3000/api/weather/forecast?lat=48.8566&lon=2.3522");
    console.log(" - air      -> http://localhost:3000/api/weather/air?lat=48.8566&lon=2.3522");
});
