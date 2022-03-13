import React, { useState, useEffect } from 'react'
import api from '../../conf/apiConf'

export default function Comment({comment, token}) {
    
    const [author, setAuthor] = useState()
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

    return (
        <div className='flex pt-4 px-2 items-center'>
            <img 
                className='rounded-full self-start'
                src={author?.attachment}
                width={40}
                height={40}
                alt=''
            />
            <div className='flex-col overflow-auto'>
                <div className='flex-col ml-4 rounded-xl bg-gray-200 break-words'>
                    <p className='font-bold px-3 py-1'>{author?.username}</p>
                    <p className='text-s text-gray-4000 px-3 pb-1'>{comment?.content}</p>
                </div>
                <div className='flex gap-3 pl-5 pt-2'>
                    <p className='font-bold text-s'>J'aime</p>
                    <p className='font-bold text-s'>Répondre</p>
                </div>
            </div>
            
        </div>
    )
}
