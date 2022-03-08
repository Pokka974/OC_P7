import React from 'react'
import { Header, Navbar, Posts } from '../../components'

const Feed = () => {



  return (
    <>
      <Header />
      <main className='flex flex-col-reverse md:flex-row'>
        {/* <Navbar /> */}
        <Posts />
      </main>
    </>
  )
}

export default Feed
