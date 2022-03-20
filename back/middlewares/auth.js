const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
            if(err){
                console.log(err)
            }else{
                const userId = decodedToken.userId;
                const isAdmin = decodedToken.isAdmin;
                req.auth = { userId, isAdmin };
                if (req.body.userId && req.body.userId !== userId) {
                    throw new Error('Invalid user ID');
                } else {
                    next();
                }
            }
        });
    
    } catch (error) {
        return res.status(403).json({ error: error | 'unauthorized request !' });
    }
};