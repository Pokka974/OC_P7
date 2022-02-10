const User = require('../models').user
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()

exports.getAllUsers = (req, res, next) => {
    User.findAll()
        .then((users) => {
            if(!users) { res.stats(404).json( { error: `Can't find any users`} )}
            
            res.status(200).json(users)
        })
        .catch((error) => {
            res.status(500).json( { error: 'unable to access to the posts in DB'} )
        })
}

exports.getOneUsers = (req, res, next) => {
    const foundUser = User.findOne(
        { 
            where: { id: req.params.id }
        })
        .then(foundUser => {
            res.status(200).json({ message: 'successfuly found the user ' + foundUser.username})
            
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
    if(email == null || username == null || password == null) {return res.status(400).json({ error: 'missing paramaters' })}

    //TODO: verify pseudo length, mail regex and password...

    const userFound = await User.findOne({
        attributes:['email'],
        where: { email: email }
    })

    if(userFound){
        return res.status(409).json({ error: 'user already exist' })
    }else{
        bcrypt.hash(password, 10, function(err, bcryptedPassword){
            const newUser = User.create({
                email: email,
                username: username,
                password: bcryptedPassword,
                created_at: new Date(),
                updated_at: new Date()
            })
            .then(newUser => {
                return res.status(201).json({
                    userId: newUser.id
                })
            })
            .catch(err => {
                return res.status(500).json({ error: err})
            })
        })
    }
}

exports.login = (req, res, next) => {

}

exports.updateUser = (req, res, next) => {

}

exports.deleteUser = (req, res, next) => {

}