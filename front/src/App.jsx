import React from 'react'
import { Routes, Route} from 'react-router-dom'
import { Signup, Login, Feed, ProfilePage, Layout, Missing, RequiredAuth } from './components'


function App(){
  return (
      <Routes>
        <Route path='/' element={<Layout />}>

          {/* public routes */}
          
          <Route path='/' element={<Signup />} />
          <Route path='login' element={<Login />} />
 
          {/* protected routes */}*
          <Route element={<RequiredAuth />}>
            <Route path='feed' element={<Feed />} />
            <Route path='profile/:id' element={<ProfilePage />} />
          </Route>
          {/* catch all */}
          <Route path='*' element={<Missing />} />
        </Route>
      </Routes>
  )
}

export default App;
