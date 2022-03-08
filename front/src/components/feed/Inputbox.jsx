import React, { useRef, useState } from 'react'
import api from '../../conf/apiConf'

export default function Inputbox() {

    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem('user'))
    })
    
    const inputRef = useRef(null)

    const sendPost = (e) => {
        e.preventDefault()
        console.log(user.token);
        if(!inputRef.current.value) return
        
        let content = {
            content: inputRef.current.value,
            attachment: 'https://www.melty.fr/wp-content/uploads/meltyfr/2022/02/media-43158.jpg'
        }

        api.post('post', content, {
            headers: {
                authorization: `Bearer ${user.token}`
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))

        inputRef.current.value = ''
    } 

    return (
        <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
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
                        placeholder={`Qu'as tu à partager, ${user.username}?`}
                    />
                    <button className='pl-2' onClick={sendPost}>Envoyer</button>
                </form>
            </div>
        </div>
    )
}
