import React from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
import PaymentPage from '../Payment/PaymentPages'

const Home = ({sidebar}) => {
  return (
    <>
      <Sidebar sidebar={sidebar} />
      <div className={`container ${sidebar?"":'large-container'}`}>
        <Feed />
      </div>
    </>
  )
}

export default Home
