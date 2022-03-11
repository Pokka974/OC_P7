import React from 'react'
import icon from '../../assets/icons/icon.png'

export default function header() {
  return (
    <div className='flex fixed w-full justify-center items-center shadow-md bg-white z-10'>
        <img className='h-20' alt='icone' src={icon}/>
    </div>
  )
}
