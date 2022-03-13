import { useContext, useEffect, useReducer, useState } from 'react'
import { Inputbox, AllPosts } from '..'
import api from '../../conf/apiConf'
import { UserContext } from './Feed'

const Posts = () => {

  const user = useContext(UserContext)
  const [token, setToken] = useState(() => {
    return JSON.parse(localStorage.getItem('user')).token
  })
  const [originalPosts, setOriginalPosts] = useState(null)

    useEffect(() => {
        refreshPosts()
    }, [])
  
  const refreshPosts = () => {
    let originalPostsArr = new Array()
    api.get('post/',{
      headers: {
          authorization: `Bearer ${token}`
      }
      })
      .then(res => {
          if(res){
              res.data.map((p) => !p.post_id && originalPostsArr.push(p) )
              setOriginalPosts(originalPostsArr)
          }
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='bg-gray-100 grow pt-20 h-full'>
      <div className='mx-auto max-w-sm md:max-w-md lg:max-w-xl xl:max-w-2xl transition-all'>
        {user && <Inputbox token={token} user={user} update={() => refreshPosts()} /> }
        {user && <AllPosts token={token} user={user} posts={originalPosts} /> }
      </div>
    </div>
    
  )
}

export default Posts
