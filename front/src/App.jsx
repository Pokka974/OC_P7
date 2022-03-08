import React, { useEffect, useState } from 'react'
import { Routes, Route, Navigate} from 'react-router-dom'
import { Signup, Login, Feed } from './components'



function App(){
  const [user, setUser] = useState(null)

  useEffect(() => {
    const u = localStorage.getItem('user')
    if(u && JSON.parse(u)){
      setUser(JSON.parse(u))
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  return (
    <Routes>
      { !user && (
          <Route path='/login' element={ <Login authenticate={(user) => setUser(user)} />} />
      )}
      { user && (
          <Route path='/feed' element={<Feed />} />
      )}
      <Route path='/signup' element={ <Signup authenticate={(user => setUser(user))} />} />
      <Route path='*' element={<Navigate to={user ? '/feed' : '/login'} />} />
    </Routes>
  )
}

export default App;
