import React, { useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'


import ZoomModal from '../../components/ZoomModal/ZoomModal.js'
import ProgressBar from '../ProgressBar/ProgressBar'
import Combobox from '../Combobox/Combobox.js'
import Download from '../Download/Download.js'

import Button from 'react-bootstrap/Button'

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

import { FiCornerUpLeft } from 'react-icons/fi'
import { BsGear } from 'react-icons/bs'

import './AfterUpload.css'

const AfterUpload = (props) => {

    const API_IMAGE_ENDPOINT = "http://localhost:5000/result/image/"

    const url = API_IMAGE_ENDPOINT + props.imageId + '/'

    const JSON_ENDPOINT = API_IMAGE_ENDPOINT + props.imageId + '/' + 9;

    const ZIP_ENDPOINT = API_IMAGE_ENDPOINT + props.imageId + '/' + 11;

    const [ open, setOpen ] = useState(false)
    const [ zoomArea, setZoomArea ] = useState(45)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const [zoomRate, setZoomRate ] = useState(640)
    const [ paths, setPaths ] = useState(false)
    const [ state, setState ] = React.useState(1);
    const [ toggle, setToggle ] = useState(false)
    const [ sizes, setSizes ] = useState(false)
    const [ accept, setAccept ] = useState(false)
    const [newPaths, setNewPaths] = useState(false)

    
    const route = API_IMAGE_ENDPOINT + props.imageId + '/' + state

    const updateZoomArea = (newValue) => {
        setZoomArea(newValue)
    }

    const updateZoomRate = (newValue) => {
        setZoomRate(newValue)
    }

    const updatePaths = (newPaths) => {
        setPaths(newPaths)
    }

    const updateToggle = (newToggle) => {
        setToggle(newToggle)
    }

    const updateSizes = (newSizes) => {
        setSizes(newSizes)
    }

    function updateType(newValue){
        setState(newValue)
    }

    const takePaths = () => {
        if(toggle) {
            updateToggle(false)
        } else {
            updateToggle(true)
        }
    }

    const updateTakePaths = () => {
        takePaths()
    }

    const img = new Image()
    img.onload = function() {
        updateSizes([img.width, img.height])
    }

    if(!sizes && props.pollingState){
        img.src = API_IMAGE_ENDPOINT + props.imageId + '/' + 0;
    }

    function handleZoom(e) {
        if (e.deltaY < 0 && zoomRate < 2000) {
            setZoomRate(zoomRate + 80)
        }
        else if (e.deltaY > 0 && zoomRate > 500) {
            setZoomRate(zoomRate - 80)
        }
    }
    /*{paths.map((paths, i) =>
        <path
            key={i}
            id={i}
            d={paths}
            fill={"transparent"}
        />
    )} */
    if(accept && paths && !newPaths) {
        setNewPaths(paths)
    }

    if(!paths && props.pollingState && !accept) {
        setAccept(true)
        fetch(JSON_ENDPOINT).then(res => res.json()).then(res => {
            updatePaths(Object.values(res))
        })
    }

    return(
        <div className="after-upload-container" style={{display: "flex", flexDirection: "row"}}>
            <button onClick={() => props.resetStates()} className="leftArrow">
                <FiCornerUpLeft className="leftArrowIcon" color={"white"} />
            </button>
            {!props.pollingState ?
                <div className="loading-container">
                    <h1>Wait while your image is being processed...</h1>
                    <h2>Estimated Time: {props.estimatedTime}</h2>
                    <ProgressBar percentage={props.percentage} />
                </div>
            :
                <div className="results-container">
                    <div className="controlPanel">
                            <div className="combobox">
                                <Combobox updateType={updateType} type={state}/>
                            </div>
                            <div className="download">
                                <Download route={route} imageId={props.imageId} zip={ZIP_ENDPOINT}/>
                            </div>
                            <div className="gear-icon">
                                <ZoomModal 
                                    handleClose={handleClose} 
                                    open={open} 
                                    updateTakePaths={updateTakePaths}
                                    toggle={toggle}
                                    newPaths={newPaths}
                                />
                                <BsGear size={48} color="white" onClick={handleOpen} style={{cursor: "pointer"}}/>
                        </div>  
                    </div>                    
                    <div className="results-card" onWheel={handleZoom}>
                        <TransformWrapper>
                            <TransformComponent>
                                <img className="imageBehind" src={route}/>
                                {toggle ?
                                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                                    className="imageAbove" viewBox={"0 0 "+ sizes[0] + " " + sizes[1]}
                                    preserveAspectRatio="xMidYMid meet">
                                    <metadata>
                                    Created by potrace 0.3, written by Peter Selinger 2001-2015
                                    </metadata>
                                    <g transform="scale(0.100000,0.100000)"
                                        fill="#ff0022">
                                    {newPaths.map((paths, i) =>
                                        <path
                                            key={i}
                                            id={i}
                                            d={paths}
                                            fill={"transparent"}
                                            stroke="#59de31" 
                                            strokeWidth="40"
                                        />
                                    )}
                                    {newPaths.map((path, i) =>
                                        <text 
                                            key={i}     
                                            x={path.split(" ")[0].replace("M", "")} 
                                            font-size={400 - 11*(Math.min(paths.length, 25))}
                                            fontWeight="bold"
                                            y={(parseInt(path.split(" ")[1]) < 400 - 11*(Math.min(paths.length, 25)))?400 - 11*(Math.min(paths.length, 25)):parseInt(path.split(" ")[1])} 
                                            >
                                            {i + 1}
                                        </text> 
                                    )}  
                                    </g>
                                </svg>                                    
                                :
                                undefined
                                }
                            </TransformComponent>
                        </TransformWrapper>
                    </div>
                </div>
            }
        </div>
    );
}

export default AfterUpload;