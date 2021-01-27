import React, { useState } from 'react'

import './HomepageContainer.css'

import UploadDropzone from '../UploadDropzone/UploadDropzone'

import Carousel from 'react-elastic-carousel'

import example1 from '../../assets/example-image-1.png'
import example2 from '../../assets/example-image-2.png'

import { FiCornerUpLeft } from 'react-icons/fi'

import AfterUpload from '../AfterUpload/AfterUpload'

const HomepageContainer = () => {
    const [imagePath, setImagePath] = useState('')

    const [imageId, setImageId] = useState('')

    const [pollingState, setPollingState] = useState(false)

    const [percentage, setPercentage] = useState(0)

    const [estimatedTime, setEstimatedTime] = useState('?')

    const  [pickModel, setPickModel] = useState(false)

    const [model, setModel] = useState('general')

    const [models, setModels] = useState(false)

    const API_RESULT_ENDPOINT = "http://localhost:5000/result/"

    const API_MODEL= "http://localhost:5000/models/"

    const updateImageId = (newId) => {
        setImageId(newId)
    }

    const updateImagePath = (newPath) => {
        setImagePath(newPath)
    }

    const updatePickModel = (newModel) => {
        setPickModel(newModel)
    }

    const updateModels = (newModels) => {
        setModels(newModels)
    }

    fetch(API_MODEL).then(res => res.json()).then(res => {
        if(!models){
            updateModels(res['models'])
        }
    })

    const allModels = models

    const selectModel = (model) => {
        updatePickModel(false)
        updateModel(model)
    }
    
    const updateModel = (newModel) => {
        setModel(newModel)
    }

    const updatePercentage = (newPercentage) => setPercentage(newPercentage)
    const updateEstimatedTime = (newTime) => setEstimatedTime(newTime)

    const resetStates = () => {
        setImagePath('')
        setImageId('')
        setPollingState(false)
        setPickModel(false)
    }

    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 1000, itemsToShow: 2},
    ];

    const checkPollingState = () => {
        fetch(API_RESULT_ENDPOINT + imageId).then(res => res.json()).then(res => {
             if(res['message'] == 'Process still running'){
                 const percentageValue = parseInt(res['Percentage'].slice(0,-1))
                 updateEstimatedTime(res['ETA'])
                 updatePercentage(percentageValue)
                 setTimeout(checkPollingState, 2000)
             }
             else{
                 setPollingState(true)
             }
         })
    }

    if(!pollingState && imageId){
        checkPollingState()
    }

    const segmentSample = (sampleId) => {
        updateImagePath(`../../assets/example-image-${sampleId}`)
        updateImageId(sampleId)
    }
    console.log(model)
    return(
        !imagePath ? 
            !pickModel ?
            <div className="homepage-container">
                <div className="upload-container-model">
                    <UploadDropzone
                        updateImagePath={updateImagePath}   
                        updateImageId={updateImageId}
                        updatePickModel={updatePickModel}
                        model={model}
                    />
                    <button 
                        data-toggle="tooltip" 
                        title={"Model: " + model} 
                        onClick={() => updatePickModel(true)}
                    >Pick a model<br/>{model}</button>
                </div>
                <div className="info-container">
                    <div className="info-card" onClick={()=>{segmentSample(1)}}>
                        <img src={example1} />
                    </div>
                    <div className="info-card" onClick={()=>{segmentSample(2)}}>
                        <img src={example2} />
                    </div>
                </div>
            </div>
            :
            <div className="carousel-models">
                <FiCornerUpLeft className="backIcon" color={"white"} onClick={() => updatePickModel(false)}/>
                <h1>Click on the most similar to your image that will be segmented</h1>
                <Carousel breakPoints={breakPoints}>
                    {allModels.map((model, i) =>
                        <img 
                            key={i} 
                            src={API_MODEL + model} 
                            className="selection-image" 
                            onClick={() => selectModel(model)}
                            data-toggle="tooltip"
                            title={model}
                        />
                    )}
                </Carousel>
            </div>
        :
        <AfterUpload
            imageId={imageId}
            resetStates={resetStates}
            pollingState={pollingState}
            percentage={percentage}
            estimatedTime={estimatedTime}
        />
    );
}

export default HomepageContainer;