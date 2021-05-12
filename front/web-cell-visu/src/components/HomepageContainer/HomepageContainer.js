import React, { useState } from 'react'

import './HomepageContainer.css'

import UploadDropzone from '../UploadDropzone/UploadDropzone'

import Carousel from 'react-elastic-carousel'

import example1 from '../../assets/example-image-1.png'
import example2 from '../../assets/example-image-2.png'

import ExampleUp from '../../assets/example-image-5.svg'

import { FiCornerUpLeft } from 'react-icons/fi'

import AfterUpload from '../AfterUpload/AfterUpload'
import { rgbToHex } from '@material-ui/core'

const HomepageContainer = (props) => {
    const [imagePath, setImagePath] = useState('')

    const [imageId, setImageId] = useState('')

    const [pollingState, setPollingState] = useState(false)

    const [percentage, setPercentage] = useState(0)

    const [estimatedTime, setEstimatedTime] = useState('?')

    const  [pickModel, setPickModel] = useState(false)

    const [model, setModel] = useState('general')

    const [models, setModels] = useState(false)

    const [ modelIndex, setModelIndex ] = useState(false);

    const [ description, setDescription ] = useState('Generalist');

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
            updateModels(res)
        }
    })

    const selectModel = (model, description) => {
        updatePickModel(false)
        updateModel(model)
        setDescription(description);
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
        props.setMenu(false)
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
        updateImagePath(`example-image-${sampleId}`)
        updateImageId(sampleId)
    }

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
                    >Model: {model}</button>
                </div>
                <div className="info-container">
                    <img className="info-card" src={example1} onClick={()=>{segmentSample(1)}}/>
                    <img className="info-card" src={example2} onClick={()=>{segmentSample(2)}}/>
                </div>
            </div>
            :
            <div className="carousel-models">
                <FiCornerUpLeft className="backIcon" color={"white"} onClick={() => updatePickModel(false)}/>
                <h1>Click on the most similar to your image that will be segmented</h1>
                <Carousel breakPoints={breakPoints}>
                    {Object.keys(models).map((model, i) =>
                        <div className="container" key={i}> 
                            <img 
                                key={i} 
                                src={API_MODEL + model} 
                                onClick={() => selectModel(model, Object.values(models)[i]['description'])}
                                data-toggle="tooltip"
                                title={model}
                            />  
                            <div class="text-block">
                                <p>{Object.values(models)[i]['description']}</p>
                            </div>
                        </div>
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
            model={model}
            description={description}
            setMenu={props.setMenu}
        />
    );
}
export default HomepageContainer;