const Like = require('../models').likes


exports.getLikeFromPost = async (req, res , next) => {
    const likes = await Like.findAll({
        where: {post_id: req.params.id}
    })
    if(!likes) { return res.status(404).json({error: 'Likes not found'}) }
    else { return res.status(200).json(likes) }
    
}

// exports.getDislikeFromPost = (req, res , next) => {
    
// }

exports.like = (req, res , next) => {
    Like.create({
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