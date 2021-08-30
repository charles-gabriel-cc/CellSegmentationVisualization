import React, { useState } from 'react'
import $ from "jquery"

import './HomepageContainer.css'

import UploadDropzone from '../UploadDropzone/UploadDropzone'

import Carousel from 'react-elastic-carousel'

import example1 from '../../assets/example-image-1.png'
import example2 from '../../assets/example-image-2.png'

import ExampleUp from '../../assets/example-image-5.svg'

import { FiCornerUpLeft } from 'react-icons/fi'

import AfterUpload from '../AfterUpload/AfterUpload'
import Photoswipe from '../Photoswipe/Photoswipe'
import Modelswipe from '../Modelswipe/Modelswipe'
import { rgbToHex } from '@material-ui/core'

import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl-layout';

import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

import { GiHamburgerMenu } from 'react-icons/gi'

import { BsDownload, BsInfoSquare, BsUpload } from 'react-icons/bs'

import { MdPhotoSizeSelectActual } from 'react-icons/md'

import { FiGithub } from 'react-icons/fi'

import cellImg from '../../assets/black-white-cells.svg'

const HomepageContainer = (props) => {
    const [imagePath, setImagePath] = useState('')

    const [imageId, setImageId] = useState('')

    const [pollingState, setPollingState] = useState(false)

    const [percentage, setPercentage] = useState(0)

    const [estimatedTime, setEstimatedTime] = useState('?')

    const [pickModel, setPickModel] = useState(false)

    const [model, setModel] = useState('general')

    const [models, setModels] = useState(false)

    const [modelIndex, setModelIndex] = useState(false);

    const [description, setDescription] = useState('Generalist');

    const [photosDic, setPhotosDic] = useState('');

    const API_RESULT_ENDPOINT = "https://www.jcell.org:3984/result/"

    const API_MODEL = "https://www.jcell.org:3984/models/"

    const color_value = 'black'

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
        if (!models) {
            var aux = []
            for(const [key, val] of Object.entries(res)) {
                aux.push({src: API_MODEL+key, name:key , description: val.description})
            }
            updateModels(res)
            setPhotosDic(aux)
        }
    })


    const selectModel = (model, description) => {
        alert("Model switched")
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
        { width: 1000, itemsToShow: 2 },
    ];

    const checkPollingState = () => {
        fetch(API_RESULT_ENDPOINT + imageId).then(res => res.json()).then(res => {
            if (res['message'] == 'Process still running') {
                const percentageValue = parseInt(res['Percentage'].slice(0, -1))
                updateEstimatedTime(res['ETA'])
                updatePercentage(percentageValue)
                setTimeout(checkPollingState, 2000)
            }
            else {
                setPollingState(true)
            }
        })
    }

    if (!pollingState && imageId) {
        checkPollingState()
    }

    const segmentSample = (sampleId) => {
        updateImagePath(`example-image-${sampleId}`)
        updateImageId(sampleId)
    }

    const uploadData = (i) => {

        const img =  document.getElementById(i)
        
        fetch(img.src)
            .then(res => res.blob())
            .then(blob => {
               const file = new File([blob], `${i}.png`, blob)

               updateImagePath(i)
                
               const formData = new FormData()
               formData.append('image', file)
               formData.append('model', model)
               formData.append('gpu', false)
       
               const options = {
                   method: 'POST',
                   body: formData,
               }
       
               const API_ENDPOINT = "https://www.jcell.org:3984/segmentation/"
       
               fetch(API_ENDPOINT, options).then(res => res.json()).then(res => {
                   updateImageId(res['id'])
               })
            })
    }

    const smallItemStyles = React.CSSProperties = {
        cursor: 'pointer',
        objectFit: 'cover',
        width: '50%',
        maxHeight: '100%',
      }

    //<img className="info-card" src={example1} onClick={()=>{uploadData("example1")}} id="example1"/>
    //<img className="info-card" src={example2} onClick={()=>{uploadData("example2")}} id="example2"/>  

    const [collapsed, setCollapsed] = useState(true)
    return (
        !imagePath ?
            !pickModel ?
                <div className="homepage-container-body">
                <ProSidebar collapsed={collapsed} toggled={true} style={{borderRight: "1px solid black" }}>
                    <SidebarHeader>
                        <div
                            style={{
                                padding: '24px',
                                textTransform: 'uppercase',
                                font: '3rem Montserrat, sans-serif',
                                fontWeight: 'bold',
                                fontSize: 36,
                                letterSpacing: '1px',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >  
                            <img className="iconCells" src={cellImg} ></img>
                            JCell
                        </div>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="round">
                            <MenuItem icon={<GiHamburgerMenu />} onClick={() => setCollapsed(!collapsed)}></MenuItem>
                        </Menu>
                        <Menu iconShape="round">
                        <MenuItem onClick={() => updatePickModel(true)} title="Model" icon={<MdPhotoSizeSelectActual />}>
                            Pick a model
                        </MenuItem>
                        <SubMenu title="About the model" icon={<BsInfoSquare />}>
                            <div className="pick-model">
                                {description}
                            </div>
                        </SubMenu>
                        <MenuItem icon={<BsUpload></BsUpload>}>
                            <UploadDropzone
                                updateImagePath={updateImagePath}   
                                updateImageId={updateImageId}
                                updatePickModel={updatePickModel}
                                model={model}
                            />
                        </MenuItem>
                    </Menu>
                    </SidebarContent>
                    <SidebarFooter  style={{ textAlign: 'center' }}>
                    <div
                        className="sidebar-btn-wrapper"
                        style={{
                            padding: '20px 24px',
                        }}
                        >
                        <a
                            href="https://github.com/fagp/caltus_API"
                            target="_blank"
                            className="sidebar-btn"
                            rel="noopener noreferrer"
                        >
                        <FiGithub />
                        </a>
                    </div>
                    </SidebarFooter>
                </ProSidebar>
                <div className="homepage-container">
                    Try to submit an example image below:
                    <Photoswipe
                        uploadData={uploadData}
                    ></Photoswipe>
                </div>
                </div>
                :
                <div className="homepage-container-body">
                    <ProSidebar collapsed={collapsed} toggled={true} style={{borderRight: "1px solid black" }}>
                        <SidebarHeader>
                            <div
                                style={{
                                    padding: '24px',
                                    textTransform: 'uppercase',
                                    font: '3rem Montserrat, sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: 36,
                                    letterSpacing: '1px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    cursor: 'pointer'
                                }}
                                onClick={()=> updatePickModel(false)}
                            >  
                                <img className="iconCells" src={cellImg} ></img>
                                JCell
                            </div>
                        </SidebarHeader>
                        <SidebarContent>
                            <Menu iconShape="round">
                                <MenuItem icon={<GiHamburgerMenu />} onClick={() => setCollapsed(!collapsed)}></MenuItem>
                            </Menu>
                            <Menu iconShape="round">
                            <MenuItem onClick={() => updatePickModel(true)} title="Model" icon={<MdPhotoSizeSelectActual />}>
                                Pick a model
                            </MenuItem>
                            <SubMenu title="About the model" icon={<BsInfoSquare />}>
                                <div className="pick-model">
                                    {description}
                                </div>
                            </SubMenu>
                            <MenuItem icon={<BsUpload></BsUpload>}>
                                <UploadDropzone
                                    updateImagePath={updateImagePath}   
                                    updateImageId={updateImageId}
                                    updatePickModel={updatePickModel}
                                    model={model}
                                />
                            </MenuItem>
                        </Menu>
                        </SidebarContent>
                        <SidebarFooter  style={{ textAlign: 'center' }}>
                        <div
                            className="sidebar-btn-wrapper"
                            style={{
                                padding: '20px 24px',
                            }}
                            >
                            <a
                                href="https://github.com/fagp/caltus_API"
                                target="_blank"
                                className="sidebar-btn"
                                rel="noopener noreferrer"
                            >
                            <FiGithub />
                            </a>
                        </div>
                        </SidebarFooter>
                    </ProSidebar>
                    <div className="homepage-container">
                        Try to select a model below:
                        <Modelswipe
                            photosDic={photosDic}
                            API_MODEL={API_MODEL}
                            selectModel={selectModel}
                        />
                    </div>
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