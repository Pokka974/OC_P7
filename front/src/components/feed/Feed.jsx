import React, {useState, useEffect, createContext} from 'react'
import api from '../../conf/apiConf'
import { Header, Navbar, PostsContainer } from '../../components'

export const UserContext = createContext()

const Feed = () => {

  // Get connected user data here and provide it with context
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('user'))
  })

  useEffect(() => {
    api.get(`user/${user.userId}`, {
      headers: {
          authorization: `Bearer ${user.token}`
      }
  })
      .then(res => {
        console.log('Logged user : ', res.data)
        setUser(res.data)
      })
      .catch(err => console.log(err))
  }, [user])


  return (
    <UserContext.Provider value={user}>
      <Header />
      <main className='flex flex-col-reverse md:flex-row'>
        {/* <Navbar /> */}
        <PostsContainer user={user} />
      </main>
    </UserContext.Provider>
  )
}

export default Feed
