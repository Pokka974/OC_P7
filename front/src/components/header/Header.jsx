import React from 'react'
import { Link } from 'react-router-dom'
import icon from '../../assets/icons/icon.png'
import Navbar from '../navbar/Navbar'

export default function header() {
  return (
    <header className='flex fixed w-full justify-between items-center shadow-md bg-white z-20 px-2'>
       
          <Link  to='/'>
              <img className='h-20 w-20 min-w-20 object-cover' alt='icone' src={icon}/>
          </Link>
       
        
        <p className='md:block hidden  ml-28 text-4xl text-orange-900'>GROUPOMANIA</p>
        <Navbar />
    </header>
  )
}
