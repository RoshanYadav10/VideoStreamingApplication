import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import CreatePlaylist from './Components/Playlist/createPlaylist'
import UploadVideo from './Components/Upload/UploadVideo'
import MyUploads from './Components/MyUploads/MyUploads'
import PaymentPage from './Pages/Payment/PaymentPages'

const App = () => {

const [sidebar,setSidebar]= useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar}/>
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar} />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/upload' element={<UploadVideo/>}/>
        <Route path='/my-upload' element={<MyUploads/>}/>

        <Route path='/create-playlist' element={<CreatePlaylist/>}/>
        <Route path='/video/:lessonId' element={<Video/>} />
        <Route path='/payment' element={<PaymentPage />}/>
      </Routes>
    </div>
  )
}

export default App
