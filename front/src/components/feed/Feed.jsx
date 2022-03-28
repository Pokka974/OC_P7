import React from 'react'
import { Header, PostsContainer } from '../../components'
import useAuth from '../../hooks/useAuth'

const Feed = () => {
 
  const user = useAuth()
  
  return (
    <>
      { user && (
        <div>
          <Header />
          <main className=''>
            <PostsContainer user={user} />
          </main>
        </div>
      )}
    </> 
  )
}

export default Feed
