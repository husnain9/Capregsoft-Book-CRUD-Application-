import React from 'react'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from './components/Home'
import View from './components/students/View'
import Edit from './components/students/Edit'
const App = () => {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/view/:id" element={<View/>} />
        <Route exact path="/edit/:id" element={<Edit/>} />
      </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App

