const Likes = require('../models').likes


exports.getLikeFromPost = async (req, res , next) => {
    const likes = await Likes.findAll({
        where: {postId: req.params.id}
    })
    if(!likes) { return res.status(404).json({error: 'Likes not found'}) }
    else { return res.status(200).json(likes) }
    
}

exports.getLikeFromUserAndPost = async (req, res, next) => {
    console.log(req.auth.userId);
    console.log(req.params.id);
    const like = await Likes.findOne({
        where: {
            postId: req.params.id,
            userId: req.auth.userId
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


exports.deleteLike = async (req, res , next) => {
    console.log('DELETE LIKE CONTRLR');
    const likeToDelete = await Likes.findOne({
        where: { id: req.params.id }
    })
    
    if(likeToDelete){
        console.log('like : ', likeToDelete);
        if(likeToDelete.userId === req.auth.userId){
            const deletedLike = await Likes.destroy({
                where: { id: likeToDelete.id }
            })
    
            if(deletedLike)  return res.status(204).json({ message: `${deletedLike} Like successfully deleted` })
            else return res.status(404).json({ error : 'Like not found' })
        } else {
            return res.status(401).json({ error: 'unauthorized action ' })
        }
        
    } else {
        return res.status(40).json({error: 'like not found'})
    }   
}