const multer = require('multer');

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png',
    'image/gif' : 'gif',
    'image/webp' : 'webp'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images/')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.');
        name.pop();
        console.log(name);
        const extension = MIME_TYPES[file.mimetype];
        if(extension) callback(null, name[0] + Date.now() + '.' + extension)
    }
});

const upload = multer({storage}).single('image')
module.exports = upload