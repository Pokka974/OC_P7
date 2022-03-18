import React, { useEffect } from 'react'
import { Header, PostsContainer } from '../../components'
import useAuth from '../../hooks/useAuth'

const Feed = () => {
 
  const user = useAuth()
  
  return (
    <>
      { user && (
        <div>
          <Header />
          <section className=''>
            <PostsContainer user={user} />
          </section>
        </div>
      )}
    </> 
  )
}

export default Feed
