// // Multer pour gérer les images
// const multer = require('multer') 


// const multerConfig = multer.diskStorage({
//     // localisation du fichier enregistré
//     destination: (req, file, callback) => {
//         callback(null, 'images')    
//     },
//     // nom du fichier
//     filename: (req, file, callback) => {
//         const ext = file.mimetype.split('/')[1] 
//         callback(null, `image-${Date.now()}.${ext}`) 
//     }
// })

// // // Est ce que c'est une image?
// // const isImage = (req, file, callback) => {
// //     if(file.mimetype.startsWith('image')) {
// //         callback(null, true)
// //     } else {
// //         callback(new Error('Image seulement !'))
// //     }
// // }

// // Config de multer
// const upload = multer({
//     storage: multerConfig
//     // fileFilter: isImage,
// })

// // exports.multer = upload.single('image')
// module.exports = multer({ multerConfig }).single('image');

const multer = require('multer');

console.log('MULTER');

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