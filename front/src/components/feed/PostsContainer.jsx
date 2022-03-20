import { useEffect, useState } from 'react'
import { Inputbox, AllPosts } from '..'
import api from '../../conf/apiConf'
import useAuth from '../../hooks/useAuth'

const PostsContainer = () => {
  
    const { auth } = useAuth()
    const [user] = useState(() => {
      return JSON.parse(localStorage.getItem('user'))
    })
    const [originalPosts, setOriginalPosts] = useState(null)

    useEffect(() => {
        refreshPosts()
    }, [])

  const refreshPosts = () => {
    console.log('REFRESH POSTS');
    let originalPostsArr = new Array()
    api.get('post/',{
      headers: {
          authorization: `Bearer ${user.token}`
      }
      })
      .then(res => {
          if(res){
              res.data.map((p) => !p.postId && originalPostsArr.push(p) )
              setOriginalPosts(originalPostsArr)
          }
      })
      .catch(err => console.log('NO POST'))
  }

  return (
    <div className='bg-gray-100 grow pt-20 min-w-full h-full'>
      <div className='mx-auto max-w-sm md:max-w-lg lg:max-w-2xl xl:max-w-2xl transition-all'>
        {auth && <Inputbox token={user.token} user={auth} update={() => refreshPosts()} /> }
        {auth && <AllPosts token={user.token} user={auth} posts={originalPosts} update={() => refreshPosts()} /> }
      </div>
      <div className='h-20 bg-gray-100'></div>
    </div>
  )
}

export default PostsContainer
