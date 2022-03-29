import React, {  useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../conf/apiConf'
import useAuth from '../../hooks/useAuth'
import AllPosts from '../feed/AllPosts'
import Inputbox from '../feed/Inputbox'
import { Fab, Action } from 'react-tiny-fab'
import 'react-tiny-fab/dist/styles.css';

export default function ProfilePage() {

    const navigate = useNavigate()
    const [posts, setPosts] = useState(null)
   
    const [token] = useState(() => {
        return  JSON.parse(localStorage.getItem('user')).token
    })
    const [ user, setUser ] = useState(null)
    const [image, setImage] = useState(null)
    const [ hasPermission, setHasPermission ] = useState(false)
    const [urlParam] = useState(() => {
        return window.location.href.split('/').pop()
    })
    const { auth } = useAuth()
    const inputRef = useRef()

    useEffect(() => {
        refreshPermission()
    })
    useEffect(() => {
        refreshUser()
    }, [])

    useEffect(() => {
        refreshPosts()
    }, [user])

    const refreshPermission = () => {
        if((urlParam == auth.id) || auth.is_admin) {setHasPermission(true)}
    }

    const refreshUser = () => {
        api.get(`user/${urlParam}`, {
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
        let originalPostsArr = new Array()
        api.get(`post/all/${urlParam}`,{
        headers: {
            authorization: `Bearer ${token}`
        }
        })
        .then(res => {
            if(res){
                res.data.map((p) => !p.postId && originalPostsArr.push(p) )
                setPosts(originalPostsArr)
            }
        })
        .catch(err => console.log('NO POST'))
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
   
    const deleteAccount = () => {
        api.delete(`user/${user.id}`,{
            headers: {
                authorization: 'Bearer ' + token
            }
        })
        .then(res => {
            if(auth.is_admin){
                navigate('/', {replace: true})
            } else {
                localStorage.removeItem('user')
                navigate('/login', {replace:true})
            }
        })
        .catch(err => console.log(err))

    }

    return (
        <div className='min-h-screen h-full flex-col w-screen min-w-screen max-w-screen'>
            <div className='flex justify-center relative h-64 bg-gray-600'>
                <div className='group absolute -bottom-6 cursor-pointer'>
                    <div className='relative'>
                        <img 
                            src={image} 
                            alt='user profile pic' 
                            className='rounded-full border-4 border-white h-48 w-48 object-cover'    
                        />
                        { hasPermission && (
                            <div onClick={() => inputRef.current.click()} className='flex lg:hidden hover:bg-gray-300 absolute -bottom-3 right-4 items-center p-2 space-x-2 h-11 bg-gray-200 border-4 rounded-lg border-white group-hover:flex'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                                <p className='text-md font-bold'>Mettre à jour</p>
                                <form method='post' encType='multipart/form-data'>
                                    <input hidden type='file' ref={inputRef} name='image' onChange={(e) => updatePP(e.target.files[0])}/>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
                
            </div>
            <p className='mt-10 mb-6 text-xl font-bold text-center'>{user?.username}</p>
           
            <div className='bg-gray-100 pt-2 h-full'>
                <div className='mx-auto max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-2xl transition-all min-h-screen h-full'>
                    {user && <Inputbox token={token} user={user} update={() => refreshPosts()} /> }
                    {user && <AllPosts
                                token={token}
                                user={user}
                                posts={posts}
                    />}
                </div>
                { hasPermission && 
                    <Fab
                    alwaysShowTitle={true}
                    icon={(
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        )}
                    >
                        <Action
                            text="Supprimer le compte" 
                            onClick={() => {
                                    if(window.confirm('Voulez-vous vraiment supprimer votre compte définitivement?')){
                                        deleteAccount()
                                    }
                                }
                            }
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </Action>
                        <Action
                            text="Se déconnecter"
                            onClick={() => {
                                if(window.confirm('Se déconnecter ?')) { 
                                    localStorage.removeItem('user')
                                    // setAuth(null)
                                    navigate('../')
                                }
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </Action>
                        <Action
                            text="Page précédente"
                            onClick={() => {navigate('../feed', {replace: true})}}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        </Action>
                    </Fab>
                }
            </div>
            <div className='h-20 bg-gray-100'></div>
        </div>
    )
}
