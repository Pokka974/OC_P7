import React, { useState } from 'react'
import api from '../../conf/apiConf'

export default function ToggleMenu({id, update, updateComment}) {

    const [token] = useState(() =>{ return JSON.parse(localStorage.getItem('user')).token})
    const deletePost = () => {
        api.delete(`post/${id}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            update()
            updateComment()
        })
        .catch(err => console.log(err))
    }

    return (
        <ul className='absolute right-0 top-8 flex-col space-y-2 shadow-xl p-1 z-10 bg-white rounded-lg'>
            <div className='flex space-x-4 items-center cursor-pointer hover:bg-gray-100 w-40 p-2 rounded-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <li>Modifier</li>
            </div> 
            <div onClick={() => {
                if(window.confirm('Voulez vous vraiment supprimer ce post?')){
                    deletePost()
                }
            }} className='flex space-x-4 items-center cursor-pointer hover:bg-gray-100 w-40 p-2 rounded-lg'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                <li>Supprimer</li>
            </div>
        </ul>
  )
}