import React, { useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'

import ZoomModal from '../../components/ZoomModal/ZoomModal.js'
import ProgressBar from '../ProgressBar/ProgressBar'
import Combobox from '../Combobox/Combobox.js'
import Download from '../Download/Download.js'

import loading from '../../assets/loading.svg'

import { FiCornerUpLeft } from 'react-icons/fi'
import { BsGear } from 'react-icons/bs'

import './AfterUpload.css'

const AfterUpload = (props) => {

    const API_IMAGE_ENDPOINT = "http://localhost:5000/result/image/"
    const [ open, setOpen ] = useState(false)
    const [ zoomArea, setZoomArea ] = useState(45)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const [zoomRate, setZoomRate ] = useState(640)

    const [state, setState] = React.useState(1);
    
    const route = API_IMAGE_ENDPOINT + props.imageId + '/' + state
    
    const segmentationType = [
        'Original Image',
        'Segmented Image',
        'Segmentation',
        'Segmentation',
        'Segmentation',
        'Segmentation',
        'Segmentation'
    ]

    const updateZoomArea = (newValue) => {
        setZoomArea(newValue)
    }

    const updateZoomRate = (newValue) => {
        setZoomRate(newValue)
    }
    function updateType(newValue){
        setState(newValue)
    }
    // 
    function handleZoom(e) {
        if (e.deltaY < 0 && zoomRate < 2000){
            setZoomRate(zoomRate + 80)
        }
        else if (e.deltaY > 0 && zoomRate > 500){
            setZoomRate(zoomRate - 80)
        }
    }
    //
    return(
        <div className="after-upload-container" style={{display: "flex", flexDirection: "row"}}>
            <button onClick={() => props.resetStates()} style={{margin: "0rem", position: "absolute", top: "0", left: "8px"}}>
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
                    <div className="results-card" onWheel={handleZoom}>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Cell image',
                                isFluidWidth: true,
                                src: API_IMAGE_ENDPOINT + props.imageId + '/' + state
                            },
                            largeImage: {
                                src: API_IMAGE_ENDPOINT + props.imageId + '/' + state,
                                width: zoomRate,
                                height: zoomRate - zoomRate/4
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
                            imageClassName: "cellImage",
                            //enlargedImageClassName: "enlargedcellImage",
                            isHintEnabled: true,
                            shouldHideHintAfterFirstActivation: false,
                            enlargedImageClassName: "enlargedcellImage"
                        }} />
                    </div>
                    <div className="controlPanel">
                        <div className="features">
                            <div className="combobox">
                                <Combobox updateType={updateType} type={state}/>
                            </div>
                            <div className="download">
                                <Download route={route} imageId={props.imageId}/>
                            </div>
                            <div className="gear-icon">
                                <ZoomModal 
                                    handleClose={handleClose} 
                                    open={open} 
                                    updateZoomArea={updateZoomArea} 
                                    zoomArea={zoomArea} 
                                    zoomRate={zoomRate}
                                    updateZoomRate={updateZoomRate}
                                />
                                <BsGear size={48} color="white" onClick={handleOpen} style={{cursor: "pointer"}}/>
                            </div>
                        </div>
                        <div className="carousel">

                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default AfterUpload;