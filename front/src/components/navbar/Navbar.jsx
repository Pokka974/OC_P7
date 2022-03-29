import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

export default function Navbar() {

  const {auth} = useAuth()
  const linkToProfile = `/profile/${auth.id}`

  return (
    <>
      { linkToProfile && 
        <Link to={linkToProfile} className='flex items-center space-x-3 cursor-pointer pr-2'>
          {auth && 
            <img 
                className=' rounded-full object-cover h-12 w-12'
                src={auth?.attachment}
                alt=''
            />
          }
          {auth && <p className='hidden md:block font-bold'>{auth.username}</p>}
        </Link>
      }
    </>
    
  )
}
