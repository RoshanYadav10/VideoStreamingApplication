import React from 'react'
import './Recommended.css'
import thumb1 from '../../assets/thumb1.png'
import thumb2 from '../../assets/thumb2.png'
import thumb3 from '../../assets/thumb3.png'
import thumb4 from '../../assets/thumb4.png'
import thumb5 from '../../assets/thumb5.png'

const Recommended = () => {
    return (
        <div className='recommended'>
            <div className="side-video-list">
                <img src={thumb1} alt="" />
                <div className="vid-info">
                    <h4>Node js</h4>
                    <p>Nikhil Classes</p>
                    <p>266K Views</p>
                </div>
            </div>

            <div className="side-video-list">
                <img src={thumb2} alt="" />
                <div className="vid-info">
                    <h4>Tailwind</h4>
                    <p>Tailwind</p>
                    <p>1M Views</p>
                </div>
            </div>

            <div className="side-video-list">
                <img src={thumb3} alt="" />
                <div className="vid-info">
                    <h4>Api</h4>
                    <p>Jaikishan Classes</p>
                    <p>1K Views</p>
                </div>
            </div>

            <div className="side-video-list">
                <img src={thumb4} alt="" />
                <div className="vid-info">
                    <h4>What is MERN?</h4>
                    <p>Roshan Classes</p>
                    <p>11K Views</p>
                </div>
            </div>

            <div className="side-video-list">
                <img src={thumb5} alt="" />
                <div className="vid-info">
                    <h4>Google Cloud</h4>
                    <p>K&K</p>
                    <p>1M Views</p>
                </div>
            </div>




        </div>
    )
}

export default Recommended
