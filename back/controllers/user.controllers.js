const User = require('../models').user
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

require('dotenv').config()

exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then((users) => {
            if(!users) { res.stats(404).json( { error: `Can't find any users`} )}
            
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(500).json( { error: 'Unable to access to the posts in DB'} )
        })
}

exports.getOneUsers = (req, res, next) => {
    const foundUser = User.findOne(
        { 
            where: { id: req.params.id }
        })
        .then(foundUser => {
            res.status(200).json({ message: 'Successfuly found the user ' + foundUser.username})
            
        })
        .catch(error => {
            res.status(404).json( {error : "User not found"} )
        })
}

exports.signup = async (req, res, next) => {
    console.log(req.body);
    // Params
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    console.log(email);
    console.log(username);
    console.log(password);
    if(email == null || username == null || password == null) {return res.status(400).json({ error: 'Missing paramaters' })}

    
    //verify pseudo length, mail regex...
    if(username.length >= 30 || username.length <= 4) { return res.status(400).json({ error: 'Username must have more than 3 char and less than 31' })}
    if(!EMAIL_REGEX.test(email)) { return res.status(400).json({ error: 'Invalid email' })}

    const userFound = await User.findOne({
        attributes:['email'],
        where: { email: email }
    })

    if(userFound){
        return res.status(409).json({ error: 'User already exist' })
    }else{
        bcrypt.hash(password, 10)
            .then(hash => {
                User.create({
                    email: email,
                    username: username,
                    password: hash,
                    created_at: new Date(),
                    updated_at: new Date()
                })
                .then(newUser => {
                    return res.status(201).json({
                        userId: newUser.id
                    })
                })
                .catch(err => {
                    return res.status(500).json({ error: err })
                })
            })
            .catch(error => {
                res.status(500).json({ error })
            })
    }
}

exports.login = (req, res, next) => {

    let email = req.body.email
    let password = req.body.password

    if(!email || !password){
        return res.status(400).json({ error: 'Missing parameters'  })
    }

    //TODO: verify mail regex & password length

    User.findOne({
        where: { email: email }
    })
    .then(userFound => {
        bcrypt.compare(password, userFound.password)
            .then(valid => {
                if(!valid){
                    return res.status(401).json( {error: 'The password doesn\'t match the user !'} );
                }
                res.status(200).json({
                    userId: userFound.id,
                    token: jwt.sign(
                        { userId: userFound.id, isAdmin: userFound.is_admin },
                        process.env.SECRET_KEY,
                        {expiresIn: '1h'}
                    )
                })
            })
    })
    .catch(error =>{
        return res.status(500).json({ error: 'Unable to verify user' })
    })
}

exports.updateUser = async (req, res, next) => {
    const userFound = await User.findOne({
        where: { id: req.params.id }
    })
    if(userFound) {
        // Check if the user who's about to be updated is also the one who's about to update it
        if(userFound.id === req.auth.userId){
            // Test which value is different from the original 
            for(let i in req.body){
                //TODO: verify the email regex, password validation, attachent URL and unable to change is_admin, created_at
                userFound[i] = userFound[i] === req.body[i] ? userFound[i] : req.body[i]
            }
            userFound.updated_at = new Date()
            // ave all the changes in DB
            userFound.save()
            return res.status(200).json({ message: 'User updated !' })
        } else {
            return res.status(401).json({ error: 'Unauthorized action'})
        }
        
    }else{
        return res.status(404).json({ error: 'User not found' })
    }
}

exports.deleteUser = (req, res, next) => {

}