const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3009;
const cors = require('cors')
const db = require('./database');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('BEKIR!');
});

app.post('/retrieveData', async (req, res) => {
    const { name, email, session, date } = req.body;
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Session:', session);
    console.log('Date:', date);
    
    const text = 'INSERT INTO AnimalFarmRegistry(Name, Email, Session, Date) VALUES($1, $2, $3, $4) RETURNING *';
    const values = [name, email, session, date];

    try {
        const response = await db.query(text, values);
        console.log(response.rows[0]);
        res.status(201).send('Data received and inserted into the database.');
    } catch (err) {
        console.error(err.stack);
        res.status(500).send('Error inserting data into the database.');
    }
    
});

app.get('/retrieveData', async (req, res) => {
    try {
      const { rows } = await db.query('SELECT * FROM AnimalFarmRegistry');
      res.status(200).json(rows);
    } catch (err) {
      console.error(err.stack);
      res.status(500).send('Error retrieving data from the database.');
    }
  });
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
