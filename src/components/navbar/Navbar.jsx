import React from 'react'
import "./style.css"
import { NavLink } from 'react-router-dom'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
gsap.registerPlugin(useGSAP);
const Navbar = () => {
    return (
        <>
            <div>
                <nav>
                    <div className='navbar'>
                        <div className="simplenav">
                            <div className="logo">
                                CybarModeling
                            </div>
                            <ul>
                                <li><NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/">Home</NavLink></li>
                                <li><NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/about">about</NavLink></li>
                                <li><NavLink className={({ isActive }) => (isActive ? "active" : "")} to="/service">services</NavLink></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mobilenav">
                        <div className="logo">
                            sadoon
                        </div>
                        <span></span>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar
