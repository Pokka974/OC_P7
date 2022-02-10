const Post = require('../models').post

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then((posts) => {
            if(!posts || posts.length === 0){ res.status(404).json({ error: 'Can\'t find any posts' })}
            
            res.status(200).json(posts)
        })
        .catch((error) => {
            res.status(500).json( {error: 'unable to access to the posts in DB'} )
        })
}   

exports.getOnePost = (req, res, next) => {
    const foundPost = Post.findOne(
        { 
            where: { id: req.params.id }
        })
        .then(foundPost => {
            res.status(200).json({ message: 'successfuly found the post ' + foundPost.id})
        })
        .catch(error => {
            res.status(404).json( {error : "Post not found"} )
        })
}

exports.addPost = (req, res, next) => {
    
}

exports.updatePost = (req, res, next) => {

}

exports.deletePost = (req, res, next) => {

}