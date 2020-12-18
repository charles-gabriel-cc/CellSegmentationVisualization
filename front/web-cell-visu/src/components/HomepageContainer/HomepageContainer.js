import React, { useState } from 'react'

import './HomepageContainer.css'

import UploadDropzone from '../UploadDropzone/UploadDropzone'

import example1 from '../../assets/example-image-1.png'
import example2 from '../../assets/example-image-2.png'

import AfterUpload from '../AfterUpload/AfterUpload'

const HomepageContainer = () => {
    const [imagePath, setImagePath] = useState('')

    const [imageId, setImageId] = useState('')

    const [pollingState, setPollingState] = useState(false)

    const [percentage, setPercentage] = useState(0)

    const [estimatedTime, setEstimatedTime] = useState('?')

    const API_RESULT_ENDPOINT = "http://localhost:5000/result/"

    const updateImageId = (newId) => {
        setImageId(newId)
    }

    const updateImagePath = (newPath) => {
        setImagePath(newPath)
    }

    const updatePercentage = (newPercentage) => setPercentage(newPercentage)
    const updateEstimatedTime = (newTime) => setEstimatedTime(newTime)

    const resetStates = () => {
        setImagePath('')
        setImageId('')
        setPollingState(false)
    }

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

    return(
        !imagePath ? 
        <div className="homepage-container">
            <div className="upload-container">
                <UploadDropzone
                    updateImagePath={updateImagePath}
                    updateImageId={updateImageId}
                />
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