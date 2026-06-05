import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './store/context/AuthContext'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'
import { SearchProvider } from './store/context/SearchContext'
// import { useEffect } from 'react'
// import socket from './socket'

function App() {

  // useEffect(()=>{
    
  // },[])
  return (
    <BrowserRouter>
    <SearchProvider>
      <AuthProvider>
        <Toaster position='top-right'/>
        <AppRoutes/>
      </AuthProvider>
      </SearchProvider>
    </BrowserRouter>
  )
}

export default App
