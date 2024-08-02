const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
let db;

client.connect(err => {
  if (err) throw err;
  db = client.db('stockData');
  console.log('Connected to MongoDB');
});

app.use(cors());

const fetchData = async (symbol) => {
  try {
    const response = await axios.get(`API_URL_FOR_${symbol}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

setInterval(async () => {
  const symbols = ['GOOG', 'BTC', 'AAPL', 'ETH', 'TSLA'];
  symbols.forEach(async (symbol) => {
    const data = await fetchData(symbol);
    db.collection('prices').insertOne({ symbol, data, timestamp: new Date() });
  });
}, 5000);

app.get('/api/data/:symbol', async (req, res) => {
  const symbol = req.params.symbol;
  const data = await db.collection('prices')
    .find({ symbol })
    .sort({ timestamp: -1 })
    .limit(20)
    .toArray();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
