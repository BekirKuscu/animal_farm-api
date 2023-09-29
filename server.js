const express = require('express');
const app = express();
const PORT = 3009;
const cors = require('cors')

app.use(cors())

app.get('/', (req, res) => {
  res.send('BEKIR!');
});

app.post('/retrieveData', (req, res) => {
    const { name, email, session, date } = req.body;
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Session:', session);
    console.log('Date:', date);
    res.send('Data received.');
});

// app.get('/retrieveData', (req, res) => {
    
//   });
  
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
