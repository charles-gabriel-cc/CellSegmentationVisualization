import React from 'react'

import cellImg from '../../assets/black-white-cells.png'

import { Link } from 'react-router-dom'

import { FiGithub } from 'react-icons/fi'
import { BsInfoCircle } from 'react-icons/bs'

import './Navbar.css'

const Navbar = () => {
    return(
        <div className="navbar">
            <img src={cellImg}></img>
            <div className="nav-title">
                <h1>CellSeg</h1>
            </div>
            <div className="nav-icons">
                <Link to='/help' className="nav-icon">
                    <BsInfoCircle size={32} color={"white"} />
                </Link>
                <a href="http://github.com/gustavogaldino/CellSegmentationVisualization"className="nav-icon">
                    <FiGithub size={32} color={"white"} />
                </a>
            </div>
        </div>
    );
}

export default Navbar;