const multer = require('multer');
//dictionnaire
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, 'images');
    },
    filename: (req, file, callback) => {
        //je récupère le nom et remplace les espaces des fichiers pas des underscores
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    //on ajout un timestamp au nom et on ajoute le point et l'extention, cela rend le nom de la photo unique
    callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');