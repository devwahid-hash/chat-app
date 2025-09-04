import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import getCurrentUser from './customHooks/getCurrentUser'
import { useSelector } from 'react-redux'
import Profile from './pages/Profile'
import getAllUsers from './customHooks/getAllUsers'
import ForgetPassword from './pages/ForgetPassword'

function App() {
  getCurrentUser()
  getAllUsers()

  let {userData}=useSelector(state=>state.user)
  return (
    <Routes>
      <Route path='/' element={userData?<Home/>:<Navigate to="/signin"/>}/>
      <Route path='/register' element={!userData ?<Register/> :<Navigate to="/profile"/>}/>
      <Route path="/signin" element={!userData?<SignIn/>:<Navigate to="/"/>}/>
      <Route path='forgetpassword' element={!userData?<ForgetPassword/>:<Navigate to="/"/>}/>
      <Route path="/profile" element={userData?<Profile/>:<Navigate to="/signin"/>}/>
    </Routes>
  )
}

export default App