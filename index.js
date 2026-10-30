require('dotenv').config({ quiet: true });
const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const plantsUrl = 'https://api.hubapi.com/crm/v3/objects/2-271005007';
const token = process.env.PRIVATE_APP_ACCESS_TOKEN;
const headers = { Authorization: `Bearer ${token}` };

function logHubSpotError(error) {
    const details = JSON.stringify(error.response?.data || error.message);
    console.error('HubSpot request failed:', error.response?.status || 'network error',
        token ? details.split(token).join('[redacted]') : details);
}

function errorMessage(error) {
    const status = error.response?.status;
    if (status === 401) return 'HubSpot rejected the access token. Check the server configuration.';
    if (status === 403) return 'HubSpot denied access. Check the private app permissions.';
    if (status === 400) return 'HubSpot rejected the plant data. Check the fields and server log.';
    return 'Unable to contact HubSpot. Check the server log and try again.';
}

app.get('/', async (req, res) => {
    try {
        const response = await axios.get(plantsUrl, {
            headers,
            params: { properties: 'name,species,watering_frequency', limit: 100 }
        });
        res.render('homepage', { title: 'Plants | Integrating With HubSpot I Practicum', plants: response.data.results });
    } catch (error) {
        logHubSpotError(error);
        res.status(502).send(errorMessage(error));
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
        logHubSpotError(error);
        res.status(502).render('updates', { title, values, error: errorMessage(error) });
    }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));
