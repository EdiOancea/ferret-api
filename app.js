const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

app.get('/api/', (req, res) => {
  res.send('Salutti');
});

app.listen(port, () => {
  console.log(`Works on port ${port}`);
});
