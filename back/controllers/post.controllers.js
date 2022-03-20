const { post } = require('../routes/user.routes')
const Post = require('../models').posts
const Likes = require('../models').likes

const fs = require('fs');

exports.getAllPosts = (req, res, next) => {
    Post.findAll()
        .then((posts) => {
            if(!posts || posts.length === 0){ return res.status(404).json({ error: 'Can\'t find any posts' })}
            
            return res.status(200).json(posts)
        })
        .catch((error) => {
            return res.status(500).json( {error: 'unable to access to the posts in DB'} )
        })
}   

exports.getAllPostsFromUser = (req, res, next) => {
    Post.findAll({
        where: {
            userId: req.params.id
        }
    })
        .then((posts) => {
            if(!posts || posts.length === 0){ return res.status(404).json({ error: 'Can\'t find any posts' })}
            
            return res.status(200).json(posts)
        })
        .catch((error) => {
            return res.status(500).json( {error: 'unable to access to the posts in DB'} )
        })
}

exports.getOnePost = (req, res, next) => {
    const foundPost = Post.findOne(
        { 
            where: { id: req.params.id }
        })
        .then(foundPost => {
            return res.status(200).json({foundPost})
        })
        .catch(error => {
            return res.status(404).json( {error : "Post not found"} )
        })
}

exports.getComments =  (req, res, next) => {

    Post.findAll({
        where: { postId: req.params.id }
    })
    .then((posts) => {
        if(!posts || posts.length === 0){ return res.status(404).json({ error: 'Can\'t find any posts' })}
        
        return res.status(200).json(posts)
    })
    .catch((error) => {
        return res.status(500).json( {error: 'unable to access to the posts in DB'} )
    })
}

exports.addPost = async (req, res, next) => {

    // set the post_type
    let post_type = 'original'

    // Get the author
    let author = req.auth.userId

    // Create the post
    const newPost = await Post.create({
        userId : author,
        post_type : post_type,
        content : req.body.textContent,
        attachment : req.file ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : '',
        created_at : new Date(),
        updated_at : new Date()
    })

    if(newPost){
        return res.status(201).json({ postId : newPost.id })
    } else {
        return res.status(500).json({ error: `can't create a new post `})
    }
}

exports.addResponse = async (req, res, next) => {
    
    console.log('Adding respongse');    // set the post_type
    let postReference = req.params.id ? req.params.id : '';
    let post_type = 'response'
    console.log(postReference);
    // Get the content
    let content = req.body.content

    // Get the attachment
    // TODO: Check if the attachment is available
    let attachment = req.body.attachment ? req.body.attachment : null

    // Get the author
    let author = req.auth.userId

    // Create the post
    const newPost = await Post.create({
        userId : parseInt(author),
        postId : postReference,
        post_type : post_type,
        content : content,
        attachment : attachment,
        created_at : new Date(),
        updated_at : new Date()
    })

    if(newPost){
        return res.status(201).json({ postId : newPost.id })
    } else {
        return res.status(500).json({ error: `can't create a new post `})
    }
}

exports.updatePost = async (req, res, next) => {

    const concernedPost = await Post.findOne({
        where: { id: req.params.id }
    })

    if(concernedPost){

        // Check if the user is also the author of the post which's about to be updated
        // Or if the user is an admin
        if(concernedPost.userId === req.auth.userId || req.auth.isAdmin){

            for(let i in req.body){
                if(i === 'content' || i === 'attachment'){
                    concernedPost[i] = concernedPost[i] === req.body[i] ? concernedPost[i] : req.body[i]
                } else {
                    return res.status(401).json({ error: 'unauthorized action ' })
                }
            }

            const updatedPost = await concernedPost.save()
            return res.status(201).json({ updatedPost })
        } else {
            return res.status(401).json({ error: 'unauthorized action ' })
        }

    } else {
        return res.status(404).json({ error: 'can\'t find any post' })
    }

}

exports.deletePost = async (req, res, next) => {

    const concernedPost = await Post.findOne({
        where: { id: req.params.id }
    })

    if(concernedPost){

        // Check if the user is also the author of the post which's about to be updated
        // Or if the user is an admin
        if(concernedPost.userId === req.auth.userId || req.auth.isAdmin){
            //Delete the image related to the post
            if(concernedPost.attachment){
                const filename = concernedPost.attachment.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Post.destroy({
                        where: { id: concernedPost.id }
                    })
                    .then(() => res.status(200).json({ message: 'Object deleted !'}))
                    .catch(error => res.status(400).json({ error }));
                });
            } else {
                Post.destroy({
                    where: { id: concernedPost.id }
                })
                .then(() => res.status(200).json({ message: 'Object deleted !'}))
                .catch(error => res.status(400).json({ error }));
            }
        } else {
            return res.status(401).json({ error: 'unauthorized action ' })
        }
    } else {
        return res.status(404).json({ error: 'Can\'t find thid post'  })
    }
}