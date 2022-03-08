import React, {useEffect, useState} from 'react'
import api from '../../conf/apiConf'
import Inputbox from './Inputbox'
export default function Posts() {

  const [posts, setPosts] = useState(null)
  const currentUser = JSON.parse(localStorage.getItem('user'))
  console.log(currentUser)

  useEffect(() => {
    api.get('post/',{
      headers: {
        authorization: `Bearer ${currentUser.token}`
      }
    })
      .then(res => {
        if(res){
          console.log(res)
          // setPosts(res.data.map((p) => p))
        }
      })
      .catch(err => console.log(err))
  }, [posts])


  return (
    <div className='bg-gray-100 grow h-screen pt-6'>
      <div className='mx-auto max-w-md md:max-w-lg'>
        <Inputbox />
      </div>
    </div>
    
  )
}
