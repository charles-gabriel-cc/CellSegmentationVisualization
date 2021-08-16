import React from 'react'

import cellImg from '../../assets/black-white-cells.svg'

import { Link } from 'react-router-dom'

import { FiGithub } from 'react-icons/fi'
import { BsInfoCircle } from 'react-icons/bs'

import './Navbar.css'

const Navbar = () => {
    return(
        <div className="navbar">
            <img src={cellImg}></img>
            <div className="nav-title">
                <h1>JCell</h1>
            </div>
            <div className="nav-icons">
                <Link to='/help' className="nav-icon">
                    <BsInfoCircle className="resizeIcons" color={"black"} />
                </Link>
                <a href="https://github.com/fagp/caltus_API"className="nav-icon">
                    <FiGithub className="resizeIcons" color={"black"} />
                </a>
            </div>
        </div>
    );
}

export default Navbar;