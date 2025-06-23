import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Box from '../components/models/box'
import "./home.css"
import cybarText from "../assets/img/cybareffect.png"
const Home = () => {
    return (
        <div>
            <Navbar />
            <section>
                <div className="container">
                    <div className="heading">
                        <img src={cybarText} width={"80%"} alt="" />
                    </div>
                    <div className="model">
                        <Box />
                    </div>
                </div>

            </section>
        </div>
    )
}

export default Home
