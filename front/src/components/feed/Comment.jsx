import React, { useState, useEffect, useRef } from 'react'
import api from '../../conf/apiConf'

export default function Comment({comment, token, user}) {
    
    const [author, setAuthor] = useState()
    const [commentInside, setCommentInside] = useState()
    const inputRef = useRef(null)

    useEffect(() => {
        refreshComments()
    }, [])

    useEffect(() => {
        let isMounted = true
        api.get(`user/${comment.user_id}`, {
            headers: {
                authorization: `Bearer ${token}`
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

        inputRef.current.value = ''
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
            .catch((err) => console.log(err))
    }

    return (
        <div className='flex pt-4 px-2 items-center'>
            <img 
                className='rounded-full self-start'
                src={author?.attachment}
                width={40}
                height={40}
                alt=''
            />
            <div className='flex-col overflow-auto w-full'>
                <div className='flex-col ml-4 rounded-xl bg-gray-200 break-words inline-block'>
                    <p className='font-bold px-3 py-1'>{author?.username}</p>
                    <p className='text-s text-gray-4000 px-3 pb-1'>{comment?.content}</p>
                </div>
                <div className='flex gap-3 pl-5 pt-2'>
                    <p className='font-bold text-s cursor-pointer hover:underline'>J'aime</p>
                    <p className='font-bold text-s cursor-pointer hover:underline'>Répondre</p>
                </div>

                {/* Comments inside */}

                { commentInside && commentInside.map( c => (
                    <Comment 
                        key={c.id}
                        comment={c}
                        token={token}
                        user={user}
                    />  
                ))}

                {/* Comment the comment input */}

                <div className='flex space-x-4 p-4 items-center'>
                    <img 
                        className='rounded-full'
                        src={user.attachment}
                        alt='user profile'
                        width={40}
                        height={40}
                        layout='fixed'
                    />

                    <form className='flex flex-1 w-full'>
                        <input 
                            className='break-word rounded-full h-12 bg-gray-100 grow px-5 focus:outline-none'
                            type='text'
                            ref={inputRef} 
                            placeholder={`Un commentaire ${user.username}?`}
                        />
                        <button className='pl-2' onClick={sendPost}>Envoyer</button>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
