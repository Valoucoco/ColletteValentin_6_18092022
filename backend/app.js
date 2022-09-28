const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');
const path = require('path');

mongoose.connect('mongodb+srv://Valoucoco:MDPtest1@cluster0.m4cmvp0.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch((e) => console.log('Connexion à MongoDB échouée !', e));


const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());
app.use(express.json());
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;