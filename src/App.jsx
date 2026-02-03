import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import MovieDashboard from './pages/MovieDashboard'
import Users from './pages/Users'
import Register from './pages/Register'
import Navbar from './pages/Navbar'

export default function App() {
  return (
    <div>
      <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/movies' element={<Movies/>}/>
      <Route path='/moviesdetails' element={<MovieDetails/>}/>
      <Route path='/moviesdashboard' element={<MovieDashboard/>}/>
      <Route path='/users' element={<Users/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </div>
  )
}
