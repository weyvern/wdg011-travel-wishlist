import express from 'express';

const port = process.env.PORT || 8000;
const app = express();

app.get('/api/countries', (req, res) => res.send('GET all countries'));
app.post('/api/countries', (req, res) => res.send('POST a country'));
app.get('/api/countries/:id', (req, res) => res.send('GET single country'));
app.put('/api/countries/:id', (req, res) => res.send('PUT single country'));
app.delete('/api/countries/:id', (req, res) => res.send('DELETE single country'));

app.listen(port, () => console.log(`Server running on port ${port}`));
