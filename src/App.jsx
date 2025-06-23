import React from 'react'
import Box from './components/models/box'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home'
import { RouterProvider, Routes, Route, BrowserRouter } from 'react-router-dom'
import About from './pages/about'
import Service from './pages/service'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          {/* <Route path="*" element={<NoPage />} /> */}
        </Routes>
        {/* <Box/> */}

      </BrowserRouter>
    </>
  )
}

export default App
