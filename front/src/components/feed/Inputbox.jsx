import React, { useRef, useState } from 'react'
import api from '../../conf/apiConf'

export default function Inputbox({token, user, update}) {

    const inputRef = useRef(null)
    const filePickerRef = useRef(null)
    const [contentTxt, setContentTxt] = useState(null)
    const [imageToShow, setImageToShow] = useState(null)
    const [image, setImage] = useState(null)

    const sendPost = (e) => {
        e.preventDefault()
        if(!inputRef.current.value) return
        
        const data = new FormData()
        
        data.append('textContent', contentTxt)
        data.append('image', image)

        api.post('post', data, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res);
                update()
            })
            .catch(err => console.log(err))
        setImage(null)
        setImageToShow(null)
        inputRef.current.value = ''
    } 

    const showImage = (file) => {
        const fr  = new FileReader()
        if(file) fr.readAsDataURL(file)
        fr.onload = (e) => {
            setImageToShow(e.target.result)
        }
    }

    const removeImage = () => {
        setImageToShow(null)
    }

    return (
        <div className='bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6'>
            <form method='post' encType='multipart/form-data' >
                <div className='flex space-x-4 px-4 py-2 items-center'>
                    <img 
                        className='rounded-full'
                        src={user.attachment}
                        alt='user profile'
                        width={40}
                        height={40}
                        layout='fixed'
                    />

                    <div className='flex flex-1'>
                        <input 
                            className='rounded-full h-12 bg-gray-100 grow px-5 focus:outline-none'
                            type='text' 
                            name='text_field'
                            ref={inputRef}
                            placeholder={`Qu'as tu à partager, ${user.username}?`}
                            onChange={ event => {
                                const { value } = event.target
                                setContentTxt(value)
                            }}
                        />
                        <button className='pl-2' onClick={sendPost} hidden>Envoyer</button>
                    </div>
                        
                    

                    {imageToShow && (
                        <div onClick={removeImage} className='flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer'>
                            <img className='h-20 object-contain' src={imageToShow} alt=''/>
                            <p className='text-xs text-red-500 text-center'>Remove</p>
                        </div>
                    )}
                </div>
                <div onClick={() => filePickerRef.current.click()} className='flex items-center space-x-2 justify-center pb-1 cursor-pointer hover:font-bold'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="blue">
                        <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <p>Photo/Image</p>
                    <input ref={filePickerRef} type='file' name='image' id='image' onChange={ event => {
                        const file = event.target.files[0]
                        showImage(event.target.files[0])
                        setImage(file)
                    }} hidden/>
                </div>
            </form>
        </div>
    )
}
