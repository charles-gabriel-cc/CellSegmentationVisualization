import React, { useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'

import ZoomModal from '../../components/ZoomModal/ZoomModal.js'
import ProgressBar from '../ProgressBar/ProgressBar'
import Combobox from '../Combobox/Combobox.js'

import loading from '../../assets/loading.svg'

import { FiCornerUpLeft } from 'react-icons/fi'
import { BsGear } from 'react-icons/bs'

import './AfterUpload.css'

const AfterUpload = (props) => {

    const API_IMAGE_ENDPOINT = "http://localhost:5000/result/image/"

    const [ open, setOpen ] = useState(false)
    const [ zoomArea, setZoomArea ] = useState(25)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)

    const updateZoomArea = (newValue) => {
        setZoomArea(newValue)
    }

    return(
        <div className="after-upload-container" style={{display: "flex", flexDirection: "row"}}>
            <button onClick={() => props.resetStates()} style={{margin: "0rem", position: "absolute", top: "72px", left: "8px"}}>
                <FiCornerUpLeft size={54} color={"white"} style={{backgroundColor: "transparent"}}/>
            </button>
            {!props.pollingState ?
                <div className="loading-container">
                    <h1>Wait while your image is being processed...</h1>
                    <h2>Estimated Time: {props.estimatedTime}</h2>
                    <ProgressBar percentage={props.percentage} />
                </div>
            :
                <div className="results-container">
                    <div className="gear-icon">
                        <ZoomModal handleClose={handleClose} open={open} updateZoomArea={updateZoomArea} zoomArea={zoomArea} />
                        <BsGear size={48} color="white" onClick={handleOpen} style={{cursor: "pointer"}}/>
                        <Combobox></Combobox>
                    </div>
                    <div className="results-card">
                        <h1>Segmented Image</h1>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Cell image',
                                width: 320,
                                height: 320,
                                src: API_IMAGE_ENDPOINT + props.imageId + '/' + 1
                            },
                            largeImage: {
                                src: API_IMAGE_ENDPOINT + props.imageId + '/' + 1,
                                width: 640,
                                height: 640
                            },
                            enlargedImageContainerDimensions: {
                                width: `${zoomArea}%`,
                                height: `${zoomArea}%`
                            },
                            style: {
                                cursor: "zoom-in"
                            },
                            enlargedImageContainerStyle: {
                                borderRadius: "10px"
                            },
                        }} />
                    </div>
                </div>
            }
        </div>
    );
}

export default AfterUpload;