import React, {  useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../conf/apiConf'
import useAuth from '../../hooks/useAuth'
import AllPosts from '../feed/AllPosts'
import Inputbox from '../feed/Inputbox'

export default function ProfilePage() {

    const navigate = useNavigate()
    const [posts, setPosts] = useState(null)
    const [token] = useState(() => {
        return  JSON.parse(localStorage.getItem('user')).token
    })
    const [ user, setUser ] = useState(null)
    const [image, setImage] = useState(null)
    const { setAuth } = useAuth()
    const inputRef = useRef()

    useEffect(() => {
        refreshUser()
    }, [])

    useEffect(() => {
        refreshPosts()
    }, [user])

    const refreshUser = () => {
        const url = window.location.href.split('/')
        const userId = url.pop()

        api.get(`user/${userId}`, {
            headers: {
                authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            console.log(res.data);
            setImage(res.data.attachment)
            setUser(res.data)
        } )
        .catch(err => console.log(err))
    }
    const refreshPosts = () => {
        api.get(`post/all/${user?.id}`, {
            headers:{
                authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            console.log(res.data);
            setPosts(res.data)
        })
        .catch(err => console.log(err))
    }

    const updatePP = (file) => {

        const data = new FormData()
        
        data.append('fieldName', 'attachment')
        data.append('image', file)
        
        api.put(`user/${user.id}`, data, {
            headers: {
                authorization: 'Bearer ' + token,
                'content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                refreshUser()
                refreshPosts()
                setImage(user.attachment)
            })
            .catch(err => console.log(err))
    }
   
    return (
        <div className='min-h-screen h-full flex-col'>
            <div className='flex justify-center relative h-64 bg-gray-600'>
                <svg onClick={() => {
                    if(window.confirm('Voulez vous vraiment vous déconnecter ?')) { 
                        localStorage.removeItem('user')
                        setAuth({})
                        navigate('../login')
                     }
                }} xmlns="http://www.w3.org/2000/svg" className="absolute top-4 right-6 h-10 border-2 p-1 bg-white border-orange-800 rounded-full hover:bg-gray-200 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="black" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <div className='group absolute -bottom-6 cursor-pointer'>
                    <div className='relative'>
                        <img 
                            src={image} 
                            alt='user profile pic' 
                            className='rounded-full border-4 border-white h-48 w-48 object-cover'    
                        />
                        <div onClick={() => inputRef.current.click()} className='visible lg:invisible hover:bg-gray-300 absolute -bottom-3 right-4 flex items-center p-2 space-x-2 h-11 bg-gray-200 border-4 rounded-lg border-white group-hover:visible'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                            </svg>
                            <p className='text-md font-bold'>Mettre à jour</p>
                            <form method='post' encType='multipart/form-data'>
                                <input hidden type='file' ref={inputRef} name='image' onChange={(e) => updatePP(e.target.files[0])}/>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
            <p className='mt-10 mb-6 text-xl font-bold text-center'>{user?.username}</p>
           
            <div className='bg-gray-100 pt-2 h-full'>
                <div className='mx-auto max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl transition-all'>
                    {user && <Inputbox token={token} user={user} update={() => refreshPosts()} /> }
                    {user && <AllPosts
                                token={token}
                                user={user}
                                posts={posts}
                    />}
                </div>
            </div>
        </div>
    )
}
