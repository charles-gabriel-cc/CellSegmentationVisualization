import React from 'react'

import Navbar from '../components/Navbar/Navbar'

import { Link } from 'react-router-dom'

import { FiCornerUpLeft } from 'react-icons/fi'

const Help = () => {
    return(
        <>
            <Navbar />
            <Link to='/' style={{margin: "1rem"}}>
                <FiCornerUpLeft size={64} color={"white"} style={{backgroundColor: "transparent"}}/>
            </Link>
        </>
    );
}

export default Help;