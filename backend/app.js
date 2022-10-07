const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const path = require('path');
const cors = require('cors');
const dotEnv = require('dotenv').config();


mongoose.connect(process.env.secretKey,
    { useNewUrlParser: true,
    useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch((e) => console.log('Connexion à MongoDB échouée !', e));


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app; 