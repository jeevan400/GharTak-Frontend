import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './store/context/AuthContext'
import AppRoutes from './routes/AppRoutes'
import { Toaster } from 'react-hot-toast'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position='top-right'/>
        <AppRoutes>
        </AppRoutes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
