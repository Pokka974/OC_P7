import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import api from '../../conf/apiConf'
import useAuth from '../../hooks/useAuth'
import ToggleMenu from '../helpers/ToggleMenu'

export default function Comment({comment, token, toggle, user, update, updateComment}) {

    const { auth } = useAuth()
    const [author, setAuthor] = useState()
    const [commentInside, setCommentInside] = useState()
    const [toggleComment, setToggleComment] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)
    const [likes, setLikes] = useState(0)
    const inputRef = useRef(null)

    useEffect(() => {
        refreshComments()
        refreshLikes()
    }, [])

    useEffect(() => {
        api.get(`user/${comment.userId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                if(res){
                    setAuthor(res.data)
                }
            })
            .catch(err => console.log(err))
    }, [user])

    const sendPost = (e) => {
        e.preventDefault()

        if(!inputRef.current.value) return

        const newComment = {
            attachment : '',
            content: inputRef.current.value
        }

        api.post(`post/${comment.id}`, newComment, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })
            .then(res => refreshComments())
            .catch(err => console.log(err))

        setToggleComment(false)
        inputRef.current.value = ''
    }

    const refreshLikes = () => {
        api.get(`likes/${comment.id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setLikes(res.data.length)
        })
    }

    const refreshComments = () => {
        api.get(`post/comments/${comment.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setCommentInside(res.data)
            } )
            .catch((err) => console.log('NO COMMENTS'))
    }   

    const toggleInput = (e) => {
        setToggleComment(!toggleComment)
    }

    const isLiked = () => {
        api.get(`likes/user/${comment.id}`,{
            headers:{
                authorization: 'Bearer ' + token
            }
        })
        .then(res => unlike(res.data.id))
        .catch(err => like())
    }

    const unlike = (likeId) => {
        api.delete(`likes/${likeId}`, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            refreshLikes()
            console.log(res);
        })
        .catch(err => console.log(err))
    }

    const like = () => {
        const like = {
            userId: user.id,
            postId: comment.id,
            post_type: comment.post_type,
            created_ad: new Date(),
            updated_at: new Date()
        }
        api.post(`likes/${comment.id}`, like, {
            headers:{
                authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            refreshLikes()
        })
        .catch(err => console.log(err))
    }

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    return (
        <div className='flex pt-4 px-4 items-center'>
            <Link className='self-start h-14 w-14' to={`profile/${author?.id}`}>
                <img 
                    className='rounded-full object-cover h-12 w-12'
                    src={author?.attachment}
                    alt='comment author profile pic'
                />
            </Link>
            
            <div className='flex-col overflow-visible w-full '>
                <div className='group flex justify-between'>
                    <div className='flex-col'>
                        <div className='ml-4 rounded-xl bg-gray-200 break-words inline-block'>
                            <p className='font-bold px-3 py-1'>{author?.username}</p>
                            <p className='text-s text-gray-4000 px-3 pb-1'>{comment?.content}</p>
                        </div>
                        <p className='ml-5 mt-1 text-xs text-gray-4000'>
                            {new Date(comment.createdAt)?.toLocaleString()}
                        </p>
                        <div className='flex gap-3 pl-5 pt-2'>
                            {likes > 0 && 
                                <div className='flex space-x-1'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="red">
                                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                    </svg>
                                    <p>{likes}</p>
                                </div>
                            }
                            <p onClick={isLiked} className='font-bold text-s cursor-pointer hover:underline'>J'aime</p>
                            <p onClick={toggleInput} className='font-bold text-s cursor-pointer hover:underline'>Répondre</p>
                        </div>
                    </div>

                        {/* Click here to open modal underneath */}   

                    {(auth.id === author?.id || auth.is_admin) &&
                        <div onClick={handleToggleMenu} className='relative self-start cursor-pointer overflow-visible '>
                            <svg   xmlns="http://www.w3.org/2000/svg" className="invisible group-hover:visible hover:bg-gray-100 rounded-full w-8 h-8 p-1.5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                            {/* Invisible modal for Delete and update post */}
                            {toggleMenu && 
                                (<ToggleMenu id={comment.id} toggle={() => toggle()} update={() => update()} updateComment={() => updateComment()} />)
                            }
                        </div>
                    }
                </div>
                
                
                {/* Comment the comment input */}

                { toggleComment && 
                    <div className='flex space-x-4 p-4 items-center'>
                        <img 
                            className='rounded-full object-cover h-12 w-12'
                            src={user.attachment}
                            alt='user profile'
                            layout='fixed'
                        />

                        <form className='flex flex-1 w-full items-center space-x-2'>
                            <input 
                                className='break-word rounded-full h-12 bg-gray-100 grow px-5 focus:outline-none'
                                type='text'
                                ref={inputRef} 
                                placeholder={`Un commentaire ${user.username}?`}
                            />
                            
                            <button className='text-sm' onClick={sendPost}>Envoyer</button>
                        </form>
                    </div>
                }

                {/* Comments inside */}

                { commentInside && commentInside.map( c => (
                    <Comment 
                        key={c.id}
                        comment={c}
                        token={token}
                        user={user}
                        toggle={() => toggle()}
                        update={() => update()}
                    />  
                ))}
            </div>
            
        </div>
    )
}