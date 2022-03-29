const passwordValidator = require('password-validator');

const schema = new passwordValidator();

schema
    .is().min(6)                                    // Minimum length 6
    .is().max(50)                                  // Maximum length 50
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Password123']);             // Blacklist these values

module.exports = (req, res, next) => {
    if(schema.validate(req.body.password)){
        return next();
    }else{
        return res.status(400).json({ message : 'Invalid password' });
    }
}