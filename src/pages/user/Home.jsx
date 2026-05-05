import React from 'react'
import useAuth from '../../hooks/useAuth'

function Home() {
    const {logout} = useAuth();
    const handleLogout = ()=>{
        logout();
    }
  return (
    <div>
      Home
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Home
