const { post } = require('../routes/user.routes')

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
            res.status(200).json({foundPost})
        })
        .catch(error => {
            res.status(404).json( {error : "Post not found"} )
        })
}

exports.addPost = async (req, res, next) => {

    // set the post_type
    let post_type = 'original'

    // Get the content
    let content = req.body.content

    // Get the attachment
    // TODO: Check if the attachment is available
    let attachment = req.body.attachment ? req.body.attachment : null

    // Get the author
    let author = req.auth.userId

    // Create the post
    const newPost = await Post.create({
        user_id : parseInt(author),
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

exports.addResponse = async (req, res, next) => {
    
    // set the post_type
    let postReference = req.params.id ? req.params.id : '';
    let post_type = 'response'

    // Get the content
    let content = req.body.content

    // Get the attachment
    // TODO: Check if the attachment is available
    let attachment = req.body.attachment ? req.body.attachment : null

    // Get the author
    let author = req.auth.userId

    // Create the post
    const newPost = await Post.create({
        user_id : parseInt(author),
        post_id : postReference,
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
        if(concernedPost.user_id === req.auth.userId || req.auth.isAdmin){

            for(let i in req.body){
                if(i === 'content' || i === 'attachment'){
                    concernedPost[i] = concernedPost[i] === req.body[i] ? concernedPost[i] : req.body[i]
                } else {
                    return res.status(401).json({ error: 'unauthorized action ' })
                }
            }

            concernedPost.updated_at = new Date()

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
        if(concernedPost.user_id === req.auth.userId || req.auth.isAdmin){

            const count = await Post.destroy({
                where: { id: concernedPost.id }
            })

            if(count) res.status(204).json({ message: `${count} Post successfully deleted` })
            else res.status(404).json({ error : 'post not found' })
        } else {
            return res.status(401).json({ error: 'unauthorized action ' })
        }
    } else {
        return res.status(404).json({ error: 'Can\'t find thid post'  })
    }
}