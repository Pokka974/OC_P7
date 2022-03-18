const Likes = require('../models').likes


exports.getLikeFromPost = async (req, res , next) => {
    const likes = await Likes.findAll({
        where: {post_id: req.params.id}
    })
    if(!likes) { return res.status(404).json({error: 'Likes not found'}) }
    else { return res.status(200).json(likes) }
    
}

// exports.getDislikeFromPost = (req, res , next) => {
    
// }

exports.getLikeFromUserAndPost = async (req, res, next) => {
    console.log(req.auth.userId);
    console.log(req.params.id);
    const like = await Likes.findOne({
        where: {
            post_id: req.params.id,
            user_id: req.auth.userId
        }
    })

    if(!like) return res.status(404).json({error: "this user didn't like this post yet"})

    else return res.status(200).json(like)
}

exports.like = (req, res , next) => {
    Likes.create({
        ...req.body
    })
    .then(like => {
        return res.status(201).json(like)
    })
    .catch(err => {
        return res.status(500).json({error: err})
    })
}

// exports.dislike = (req, res , next) => {

// }

exports.deleteLike = (req, res , next) => {

}