import React, { useEffect } from 'react'
import Models from './model' 
import "./style.css"
const Box = () => {
    useEffect(() => {
        Models()
    }, [])
    return (
        <div>
            <div className="outerBox">
                <canvas id='box' className='box' color='transparent'></canvas>
            </div>
        </div>
    )
}

export default Box
