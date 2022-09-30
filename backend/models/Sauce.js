const mongoose = require('mongoose');

//création d'un schéma de données
const sauceSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    heat: { type: Number, required: true},
    manufacturer: {type: String, required: true},
    usersLiked: {type: [String], required: true},
    usersDisliked: {type: [String], required: true}
});

module.exports = mongoose.model('Sauce', sauceSchema);