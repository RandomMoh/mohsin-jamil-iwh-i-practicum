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

app.get('/update-cobj', (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum', values: {} });
});

app.post('/update-cobj', async (req, res) => {
    const values = {
        name: (req.body.name || '').trim(),
        species: (req.body.species || '').trim(),
        watering_frequency: (req.body.watering_frequency || '').trim()
    };
    const title = 'Update Custom Object Form | Integrating With HubSpot I Practicum';
    if (!values.name) {
        return res.status(400).render('updates', { title, values, error: 'Please enter a name.' });
    }
    try {
        await axios.post(plantsUrl, { properties: values }, { headers });
        res.redirect('/');
    } catch (error) {
        console.error('HubSpot request failed:', error.response?.status, error.response?.data || error.message);
        res.status(502).render('updates', { title, values, error: 'Unable to add the plant in HubSpot. Check the server log for details and try again.' });
    }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
