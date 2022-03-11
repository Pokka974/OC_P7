import React, { useEffect, useRef, useState } from 'react'
import api from '../../conf/apiConf'
export default function Post({user, post}) {
    
    const [author, setAuthor] = useState()
    const [comments, setComments] = useState()
    const inputRef = useRef(null)
    const currentUser = JSON.parse(localStorage.getItem('user'))
    //is a comment? 
    useEffect(() => {
        
        let isMounted = true
        api.get(`user/${post.user_id}`, {
            headers: {
                authorization: `Bearer ${currentUser.token}`
            }
        })
            .then(res => {
                if(res){
                    if(isMounted) setAuthor(res.data)
                }
            })
            .catch(err => console.log(err))
        return () => { isMounted = false }
    }, [])

    useEffect(() => {
        console.log(post.id);
            api.get(`post/comments/${post.id}`, {
                headers: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            })
                .then((res) => {
                    setComments(res.data)
                } )
                .catch((err) => console.log(err))
        
    })

    const sendPost = (e) => {
        e.preventDefault()
        
        const newComment = {
            attachment : '',
            content: inputRef.current.value,
        }
        api.post(`post/${post.id}`, newComment, {
            headers: {
                authorization: `Bearer ${currentUser.token}`
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const focusOnComment = () => {
        inputRef.current.focus()
        inputRef.current.placeholder = ''
    }

    return (
        <div className='flex flex-col'>
            <div className='p-5 bg-white mt-5 rounded-t-2xl shadow-md'>
                <div className='flex items-center space-x-2'>
                    <img 
                        className='rounded-full'
                        src={author?.attachment}
                        width={40}
                        height={40}
                        alt=''
                    />

                    <div>
                        <p className='font-medium'>{author?.username}</p>
                        <p className='text-xs text-gray-4000'>
                            {new Date(post.createdAt)?.toLocaleString()}
                        </p>
                    </div>
                </div>

                <p className='pt-4'>{post.content}</p>
            </div>

            {post.attachment && (
                <div className='relative h-50 object-cover md:h-96 bg-white'>
                    <img 
                        src={post.attachment}
                        layout='fill'
                        alt=''
                    />
                </div>
            )}

            {/* Footer of the post */}

            <div className='flex justify-evenly items-center  bg-white
            shadow-md text-gray-400 border-t'>
                <div className='flex items-center space-x-2 p-3 rounded-none rounded-bl-2xl'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5" viewBox="0 0 20 20" fill="red">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                    <p>J'aime</p>
                </div>

                <div className='flex items-center space-x-2 p-3 rounded-none rounded-bl-2xl' onClick={focusOnComment}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5" fill="none" viewBox="0 0 24 24" stroke="blue" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <p>Commenter</p>
                </div>
            </div>

            {/* COMMENTS SECTION */}
            
            <div className='bg-white rounded-b-2xl shadow-md text-gray-500 font-medium border-t'>
                <div className='flex space-x-4 p-4 items-center'>
                    <img 
                        className='rounded-full'
                        src={user.attachment}
                        alt='user profile'
                        width={40}
                        height={40}
                        layout='fixed'
                    />

                    <form className='flex flex-1'>
                        <input 
                            className='rounded-full h-12 bg-gray-100 grow px-5 focus:outline-none'
                            type='text'
                            ref={inputRef} 
                            placeholder={`Un commentaire ${user.username}?`}
                        />
                        <button className='pl-2' onClick={sendPost}>Envoyer</button>
                    </form>
                </div>
                {/* All the comments must be here */}
            </div>
        </div>

        // render all the comments here
    )
}
