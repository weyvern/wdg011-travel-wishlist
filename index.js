import express from 'express';

const port = process.env.PORT || 8000;
const app = express();

app.use(express.json());

const countries = [
  { id: 1, name: 'United States of America', alpha2Code: 'US', alpha3Code: 'USA' },
  { id: 2, name: 'Germany', alpha2Code: 'DE', alpha3Code: 'DEU' },
  { id: 3, name: 'Mexico', alpha2Code: 'MX', alpha3Code: 'MEX' },
  { id: 4, name: 'Canada', alpha2Code: 'CA', alpha3Code: 'CAN' },
  { id: 5, name: 'Colombia', alpha2Code: 'CO', alpha3Code: 'COL' }
];

const findCountry = query => {
  return countries.find(
    c =>
      c.alpha2Code.toLowerCase() === query.toLowerCase() ||
      c.alpha3Code.toLowerCase() === query.toLowerCase()
  );
};

app.get('/api/countries', (req, res) => {
  res.json(countries);
});

app.post('/api/countries', (req, res) => {
  const maxID = Math.max(...countries.map(c => c.id));
  const newCountry = { id: maxID + 1, ...req.body };
  countries.push(newCountry);
  res.json(newCountry);
});

app.get('/api/countries/:id', (req, res) => {
  const query = req.params.id;
  const foundCountry = findCountry(req.params.id);
  if (!foundCountry)
    return res.status(404).json({ error: `Country with id of ${query} not found` });
  res.json(foundCountry);
});

app.put('/api/countries/:id', (req, res) => {
  const {
    body: { name, alpha2Code, alpha3Code },
    params: { id }
  } = req;
  const foundCountry = findCountry(id);
  if (!foundCountry) return res.status(404).json({ error: `Country with id of ${id} not found` });
  foundCountry.name = name;
  foundCountry.alpha2Code = alpha2Code;
  foundCountry.alpha3Code = alpha3Code;

  res.json(foundCountry);
});

app.delete('/api/countries/:id', (req, res) => {
  const {
    params: { id }
  } = req;
  const foundCountry = findCountry(id);
  if (!foundCountry) return res.status(404).json({ error: `Country with id of ${id} not found` });
  countries.splice(
    countries.findIndex(c => c.id === foundCountry.id),
    1
  );
  res.json({ message: `Country with id of ${id} was deleted` });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
