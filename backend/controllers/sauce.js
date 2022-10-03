const Sauce = require("../models/Sauce");
const fs = require("fs");
const { findOne } = require("../models/Sauce");

//création de la sauce
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        likes: 0,
        dislikes: 0,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
            } else {
                if (sauce.imageUrl != sauceObject.imageUrl ) {
                    const filename = sauce.imageUrl.split("/images/")[1];
                    try {fs.unlinkSync(`images/${filename}`)}
                    catch (err) {console.error(err)}
                }
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
        if (sauce.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
        } else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
            .then(() => {
                res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
        }
    })
    .catch((error) => {
        res.status(500).json({ error });
    });
};

exports.getAllSauce = (req, res, next) => {
    Sauce.find()
        .then((sauces) => {
            res.status(200).json(sauces);
        })
        .catch((error) => {
            res.status(400).json({
            error: error,
            });
        });
};

exports.like = (req, res, next) => {
    const like = req.body.like;
    
    const userId = req.body.userId;
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) =>{ {
            //si le like est égal à zéro
            if (like === 0) {    
                let indexLike = sauce.usersLiked.findIndex(item => item === userId)
                if(indexLike > -1){
                    sauce.usersLiked.splice(indexLike, 1)
                }
                let indexDislike = sauce.usersDisliked.findIndex(item => item === userId)
                if(indexDislike > -1){
                    sauce.usersDisliked.splice(indexDislike, 1)
                }
            //si le like est égal à 1 (liked)
            } else if (like === 1) {
                let set = new Set(sauce.usersLiked);
                set.add(userId);
                sauce.usersLiked = [...set.values()]
            //si le like est égal à -1 (disliked)
            } else if (like === -1) {
                let set = new Set(sauce.usersDisliked);
                set.add(userId);
                sauce.usersDisliked = [...set.values()]
            }
            sauce.save()
            .then(() => {
            console.log(sauce)
                res.status(201).json({ message: "Objet enregistré !" });
            })
            .catch((error) => {
                res.status(400).json({ error });
            });
        }})
};