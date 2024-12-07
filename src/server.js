const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB bağlantısı
mongoose.connect('mongodb+srv://mertkocak2811:LStMhjK4vOK3cNsw@habitupc1.kruic.mongodb.net/?retryWrites=true&w=majority&appName=habitupc1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB bağlantısı başarılı!');
}).catch(err => {
  console.error('MongoDB bağlantı hatası:', err);
});

// Bir örnek model
const DataSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
const Data = mongoose.model('Data', DataSchema);

// CRUD işlemleri
app.get('/data', async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

app.post('/data', async (req, res) => {
  const newData = new Data(req.body);
  await newData.save();
  res.json(newData);
});

app.listen(3000, () => {
  console.log('Sunucu 3000 portunda çalışıyor!');
});
