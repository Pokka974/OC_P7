import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../conf/apiConf'
import useAuth from '../../hooks/useAuth'
import ToggleMenu from '../helpers/ToggleMenu'
import Comment from './Comment'
export default function Post({user, post, token, update}) {
    
    const { auth } = useAuth()
    const [author, setAuthor] = useState()
    const [comments, setComments] = useState()
    const [likes, setLikes] = useState(0)
    const [toggleEdit, setToggleEdit] = useState(false)
    const [toggleMenu, setToggleMenu] = useState(false)
    const inputRef = useRef(null)
    const editInputRef = useRef(null)

    useEffect(() => {
        refreshComments()
        refreshLikes()
    }, [])

    useEffect(() => {     
        api.get(`user/${post.userId}`, {
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
            content: inputRef.current.value,
        }
        api.post(`post/${post.id}`, newComment, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
            .then(res => refreshComments())
            .catch(err => console.log(err))

        inputRef.current.value = ''
    }

    const refreshLikes = () => {
        api.get(`likes/${post.id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            setLikes(res.data.length)
        })
    }

    const refreshComments = () => {
        console.log('REFRESH COMMENT');
        api.get(`post/comments/${post.id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((res) => {
                setComments(res.data)
            })
            .catch((err) => console.log('NO COMMENTS'))
    }

    const focusOnComment = () => {
        inputRef.current.focus()
        inputRef.current.placeholder = ''
    }

    const isLiked = () => {
        api.get(`likes/user/${post.id}`,{
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
            postId: post.id,
            post_type: post.post_type,
            created_ad: new Date(),
            updated_at: new Date()
        }
        api.post(`likes/${post.id}`, like, {
            headers:{
                authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            refreshLikes()
            console.log(res)
        })
        .catch(err => console.log(err))
    }

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const editPost = () => {
        console.log(editInputRef.current.value);

        if(!editInputRef.current.value || editInputRef.current.value === post.content) return

        const data = {
            content: editInputRef.current.value
        }
        api.put(`post/${post?.id}`, data, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })
        .then(res => update())
        .catch(err => console.log(err))
    }

    return (
        <div  className='flex flex-col'>

            {/* POST CONTENT + USER INFO */}

            <div className='p-5 bg-white mt-5 rounded-t-2xl shadow-md'>
                <div className='flex justify-between'>
                    <Link to={`/profile/${author?.id}`} className='flex items-center space-x-2 cursor-pointer group'>
                        <img 
                            className='rounded-full object-cover h-12 w-12'
                            src={author?.attachment}
                            alt='user profile pic'
                        />

                        <div className='group-hover:underline'>
                            <p className='font-bold'>{author?.username}</p>
                            <p className='text-xs text-gray-4000'>
                                {new Date(post.createdAt)?.toLocaleString()}
                            </p>
                        </div>
                    </Link>
                    <div className='relative'>
                        {/* Click here to open modal underneath */}
                        
                        { (auth.id === author?.id || auth.is_admin) &&    
                            <svg onClick={handleToggleMenu} className='cursor-pointer hover:bg-gray-100 rounded-full w-8 h-8 p-1.5' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                            </svg>
                        }
                        
                        {/* Invisible modal for Delete and update post */}

                        {toggleMenu && 
                            (<ToggleMenu id={post.id} toggle={() => setToggleMenu(!toggleMenu)} edit={() => setToggleEdit(!toggleEdit)} update={() => update()} updateComment={() => refreshComments()}/>)
                        }   

                    </div>
                    
                </div>
                <div>
                    {
                        toggleEdit ? 
                            <div className='relative w-full'>
                                <textarea ref={editInputRef} className='bg-gray-100 mt-4 p-2 shadow-sm rounded-lg w-full ring-1 ring-orange-400' rows={8}>
                                {post?.content}
                                </textarea>
                                <button className='absolute right-2 bottom-4 border p-1 rounded-lg hover:bg-blue-400 
                                text-sm font-bold hover:text-white' 
                                onClick={() => {
                                    editPost()
                                    setToggleEdit(false)
                                    setToggleMenu(false)
                                }} >Envoyer</button>
                            </div>
                            
                        : 
                            (<p className='pt-4'>{post?.content}</p>)
                        
                    }
                </div>
                
                
            </div>

            {/* POST ATTACHMENT */}

            {post.attachment && (
                <div className='relative h-50 object-cover md:h-70 flex justify-center bg-white'>
                    <img 
                        
                        src={post.attachment}
                        layout='fill'
                        alt=''
                    />
                </div>
            )}
            
            
            {likes > 0 &&  (
                <div className='bg-white flex items-center space-x-1 p-2 pl-5'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6" viewBox="0 0 20 20" fill="red">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <p className='font-medium text-lg'>{likes}</p>
                </div>
            )}
            
            {/* Footer of the post */}

            <div className='flex justify-evenly items-center  bg-white
            text-gray-400 border-t'>
                <div onClick={isLiked} className='flex items-center space-x-2 p-3 rounded-none rounded-bl-2xl cursor-pointer hover:font-bold'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5" viewBox="0 0 20 20" fill="red">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <p>J'aime</p>
                </div>

                <div className='flex items-center space-x-2 p-3 rounded-none rounded-bl-2xl cursor-pointer hover:font-bold' onClick={focusOnComment}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5" fill="none" viewBox="0 0 24 24" stroke="blue" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p>Commenter</p>
                </div>
            </div>

            {/* COMMENTS SECTION */}
            
            <div className='bg-white text-gray-500 font-medium border-t rounded-b-2xl shadow-md'>
                
                {/* All the comments must be here */}
                {comments && (
                    comments.map((c) => <Comment 
                        key={c.id}
                        comment={c}
                        token={token}
                        user={user}
                        update={() => update()}
                        toggle={() => setToggleMenu(!toggleMenu)}
                        updateComment={() => refreshComments()}
                    />)
                )}

                {/* INPUT TO ADD A NEW COMMENT */}

                <div className='flex space-x-4 p-4 items-center'>
                    <img 
                        className='rounded-full object-cover h-12 w-12'
                        src={user.attachment}
                        alt='user profile'
                        layout='fixed'
                    />

                    <form className='flex flex-1 items-center space-x-2'>
                        <input 
                            className='rounded-full h-12 bg-gray-100 grow px-5 focus:outline-none'
                            type='text'
                            ref={inputRef} 
                            placeholder={`Un commentaire ${user.username}?`}
                        />
                        
                        <button className='hidden md:block text-sm' onClick={sendPost}>Envoyer</button>
                    </form>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-auto block md:hidden h-6 w-6 mb-3 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
            </div>
            
        </div>
    )
}
