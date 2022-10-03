const multer = require('multer');
//dictionnaire
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
    callback(null, 'images');
    },
    filename: (req, file, callback) => {
    let name = file.originalname.split(' ').join('_').split('.');
    const extension = MIME_TYPES[file.mimetype];
    name.pop();
    callback(null, name.join(".") + "_" + Date.now() + '.' + extension);
    }
});

module.exports = multer({storage: storage}).single('image');