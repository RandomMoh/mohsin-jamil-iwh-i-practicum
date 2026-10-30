require('dotenv').config({ quiet: true });
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const plantsUrl = 'https://api.hubapi.com/crm/v3/objects/2-271005007';
const headers = { Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS_TOKEN}` };

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(plantsUrl, {
            headers,
            params: { properties: 'name,species,watering_frequency', limit: 100 }
        });
        res.render('homepage', { title: 'Plants | Integrating With HubSpot I Practicum', plants: response.data.results });
    } catch (error) {
        console.error('HubSpot request failed:', error.response?.status, error.response?.data || error.message);
        res.status(502).send('Unable to load plants from HubSpot. Check the server log for details.');
    }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
