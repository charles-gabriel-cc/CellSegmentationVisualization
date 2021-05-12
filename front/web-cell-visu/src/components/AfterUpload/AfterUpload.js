import React, { useState } from 'react'
import ReactImageMagnify from 'react-image-magnify'
import * as d3 from 'd3'

import ZoomModal from '../../components/ZoomModal/ZoomModal.js'
import ProgressBar from '../ProgressBar/ProgressBar'
import Combobox from '../Combobox/Combobox.js'
import Download from '../Download/Download.js'
import SVG from '../SVG/SVG.js'

import Button from 'react-bootstrap/Button'
import Switch from "react-switch";
import TextField from '@material-ui/core/TextField';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

import { FiCornerUpLeft } from 'react-icons/fi'
import { BsGear } from 'react-icons/bs'
import { BsDownload, BsInfoSquare } from 'react-icons/bs'
import { IoMdAlbums } from 'react-icons/io'
import { AiOutlineZoomIn, AiOutlineZoomOut, AiOutlineClear } from 'react-icons/ai'
import { MdPhotoSizeSelectActual } from 'react-icons/md'
import { MdZoomOutMap } from 'react-icons/md'
import { FiGithub } from 'react-icons/fi'
import { BsInfoCircle } from 'react-icons/bs'
import {AiFillTags} from 'react-icons/ai'

import cellImg from '../../assets/black-white-cells.png'

import { GiHamburgerMenu } from 'react-icons/gi'

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

import './AfterUpload.css'
import './AfterUpload.scss'
import { Icon } from '@material-ui/core'

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const AfterUpload = (props) => {

    const API_IMAGE_ENDPOINT = "https://www.jcell.org:3984/result/image/"

    const url = API_IMAGE_ENDPOINT + props.imageId + '/'

    const JSON_ENDPOINT = API_IMAGE_ENDPOINT + props.imageId + '/' + 9;

    const ZIP_ENDPOINT = API_IMAGE_ENDPOINT + props.imageId + '/' + 11;

    const [open, setOpen] = useState(false)
    const [zoomArea, setZoomArea] = useState(45)
    const handleClose = () => setOpen(false)
    const handleOpen = () => setOpen(true)
    const [zoomRate, setZoomRate ] = useState(640)
    const [ paths, setPaths ] = useState(false)
    const [ state, setState ] = React.useState('1');
    const [ toggle, setToggle ] = useState(false)
    const [ sizes, setSizes ] = useState(false)
    const [ accept, setAccept ] = useState(false)
    const [newPaths, setNewPaths] = useState(false)
    const [enumeration, setEnumeration] = useState(false)
    const [borders, setBorders] = useState(true);


    const route = API_IMAGE_ENDPOINT + props.imageId + '/' + 0

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

    function updateType(newValue) {
        setState(newValue)
    }

    const updateEnumeration = () => {
        setEnumeration(!enumeration)
    }

    const updateBorders = () => {
        setBorders(!borders)
    }

    const img = new Image()
    img.onload = function () {
        updateSizes([img.width, img.height])
    }

    if (!sizes && props.pollingState) {
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

    if(accept && paths && !newPaths) {
        setNewPaths(paths)
        props.setMenu(true)
    }

    if (!paths && props.pollingState && !accept) {
        setAccept(true)
        fetch(JSON_ENDPOINT).then(res => res.json()).then(res => {
            updatePaths(Object.values(res))
        })
        updateToggle(true);
    }

    const colors = {
        0: ["transparent", "transparent", "1", "brightness(100%)"],
        4: ["#000000", "#ffffff", "1", "brightness(0%)"],
        5: ["transparent", "#ff3300", "1", "brightness(50%)"],
        3: [false, "transparent", "1", "brightness(0%)"],
        1: [false, "#59de31", "0.3", "brightness(100%)"],
        2: ["#ffffff", "transparent", "1", "brightness(0%)"],
    }

    function getCentroid(el) {
        var path = el
        var cnt = 0;
        var ans = { x: 0, y: 0 };
        for (var i = 0; i < path.length; i++) {
            if (path[i][0] == 'M' || path[i][0] == 'L') {
                ans.x += path[i][1];
                ans.y += path[i][2];
                cnt++;
            }
        }
        ans.x /= cnt;
        ans.y /= cnt;
        return ans;
    }

    function handleKeyPress(e) {
        console.log(e)
    }

    const [checked, setChecked] = useState(false)
    const handleChecked = (newCheck) => {
        setChecked(newCheck)
        updateEnumeration()
    }

    const [cellString, setCellString] = useState()

    const [toggleBack, setToggleBack] = useState(true)

    const [selected, setSelected] = useState([])

    const [collapsed, setCollapsed] = useState(true)

<<<<<<< HEAD
=======
    /*
        <div className="controlPanel">
            <div className="combobox">
                <Combobox updateType={updateType} type={state}/>
            </div> 
            Model:<br/> {props.description}
            <Download imageId={props.imageId}/>
        </div>   
    */

    /* {!props.pollingState || !newPaths ?
         <div className="loading-container">
             <h1>Wait while your image is being processed...</h1>
             <h2>Estimated Time: {props.estimatedTime}</h2>
             <ProgressBar percentage={props.percentage} />
         </div>
     :
         <div>                 
             <div className="results-card" onWheel={handleZoom}>
                 <TransformWrapper>
                     {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                     <React.Fragment>
                         <div className="tools">
                             <button onClick={() => setSelected([])}><AiOutlineClear color={"white"}/></button>
                             <button onClick={() => setToggleBack(!toggleBack)}><IoMdAlbums color={"white"}/></button>
                             <button onClick={zoomIn}><AiOutlineZoomIn color={"white"}/></button>
                             <button onClick={zoomOut}><AiOutlineZoomOut color={"white"}/></button>
                             <button onClick={resetTransform}><MdZoomOutMap color={"white"}/></button>
                         </div>
                         <div className="imageBorders">
                             <TransformComponent>
                                 <img id="log" className="imageBehind" style={toggleBack?{filter: colors[state][3]}:{filter: "brightness(0%)"}} src={route}/>
                                 <SVG
                                     sizes={sizes}
                                     newPaths={newPaths}
                                     borders={borders}
                                     colors={colors}
                                     enumeration={enumeration}
                                     state={state}
                                     imageId={props.imageId}
                                     selected={selected}
                                     setSelected={setSelected}
                                 />
                             </TransformComponent>
                         </div>
                     </React.Fragment>
                     )}
                 </TransformWrapper>
             </div>
         </div>
     } */

>>>>>>> fe0ea85f5cb581cd14e938e08d9d5fc76104260a
    const handleState = (event) => {
        setState(event.target.value)
    }

<<<<<<< HEAD
    console.log(props.estimatedTime)

    function allTags() {
        let all = []
        for(let i = 0; i < newPaths.length; i++) {
            all.push(i)
        }
        setSelected(all)
    }

    return(
        <div>
        {!props.pollingState || !newPaths ? undefined :
        <div className="after-upload-container">
            <ProSidebar collapsed={collapsed}>
                <SidebarHeader>
                    <div
                        style={{
                            padding: '24px',
                            textTransform: 'uppercase',
                            font: '42px Montserrat, sans-serif',
                            fontWeight: 'bold',
                            fontSize: 36,
                            letterSpacing: '1px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                        onClick={() => props.resetStates()}
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
                        <SubMenu title="Masks" icon={<MdPhotoSizeSelectActual />}>
                            <Combobox 
                                state={state}
                                handleState={handleState}
                            />
                        </SubMenu>
                        <SubMenu title="Model" icon={<BsInfoSquare />}>
                            {props.description}
                        </SubMenu>
                        <MenuItem icon={<BsDownload/>}>
                            <Download imageId={props.imageId}/>
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
                        href="https://github.com/charles-gabriel-cc/CellSegmentationVisualization"
                        target="_blank"
                        className="sidebar-btn"
                        rel="noopener noreferrer"
                    >
                    <FiGithub />
                    </a>
                </div>
                </SidebarFooter>
            </ProSidebar>
=======
    return (
        <div>
            {!props.pollingState || !newPaths ? undefined :
                <div className="after-upload-container">
                    <ProSidebar collapsed={collapsed}>
                        <SidebarHeader>
                            <div
                                style={{
                                    padding: '24px',
                                    textTransform: 'uppercase',
                                    font: '42px Montserrat, sans-serif',
                                    fontWeight: 'bold',
                                    fontSize: 36,
                                    letterSpacing: '1px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <img className="iconCells" src={cellImg}></img>
                        JCell
                    </div>
                        </SidebarHeader>

                        <SidebarContent>
                            <Menu iconShape="round">
                                <MenuItem icon={<GiHamburgerMenu />} onClick={() => setCollapsed(!collapsed)}></MenuItem>
                                <MenuItem icon={<FiCornerUpLeft />} onClick={() => props.resetStates()}></MenuItem>
                            </Menu>
                            <Menu iconShape="round">
                                <SubMenu title="Masks" icon={<MdPhotoSizeSelectActual />}>
                                    <Combobox
                                        state={state}
                                        handleState={handleState}
                                    />
                                </SubMenu>
                                <SubMenu title="Model" icon={<BsInfoSquare />}>
                                    {props.description}
                                </SubMenu>
                                <MenuItem icon={<BsDownload />}>
                                    <Download imageId={props.imageId} />
                                </MenuItem>
                            </Menu>
                        </SidebarContent>

                        <SidebarFooter style={{ textAlign: 'center' }}>
                            <div
                                className="sidebar-btn-wrapper"
                                style={{
                                    padding: '20px 24px',
                                }}
                            >
                                <a
                                    href="https://github.com/charles-gabriel-cc/CellSegmentationVisualization"
                                    target="_blank"
                                    className="sidebar-btn"
                                    rel="noopener noreferrer"
                                >
                                    <FiGithub />
                                </a>
                            </div>
                        </SidebarFooter>
                    </ProSidebar>
>>>>>>> fe0ea85f5cb581cd14e938e08d9d5fc76104260a

                </div>
            }
            {!props.pollingState || !newPaths ?
                <div className="loading-container">
                    <h1>Wait while your image is being processed...</h1>
                    {(props.estimatedTime != '?' && props.estimatedTime != '00:00') ?
                    <h2>Estimated Time: {props.estimatedTime}</h2>
                    :
                    undefined
                    }
                    <ProgressBar percentage={props.percentage} />
                </div>
                :
                <div className="results-container">
<<<<<<< HEAD
                <div className="results-card" onWheel={handleZoom}>
                    <TransformWrapper>
                        {({scale, zoomIn, zoomOut, resetTransform, ...rest }) => (
                        <React.Fragment>
                            <div className="imageBorders">
                                <TransformComponent>
                                    <img id="log" className="imageBehind" style={(toggleBack || state == 0)?{filter: colors[state][3]}:{filter: "brightness(0%)"}} src={route}/>
                                    <SVG
                                        sizes={sizes}
                                        newPaths={newPaths}
                                        borders={borders}
                                        colors={colors}
                                        enumeration={enumeration}
                                        state={state}
                                        imageId={props.imageId}
                                        selected={selected}
                                        setSelected={setSelected}
                                        scale={scale}
                                    />
                                </TransformComponent>
                            </div>
                            <div className="tools">
                                <button onClick={resetTransform}><MdZoomOutMap color={"white"}/></button>
                                <button onClick={zoomIn}><AiOutlineZoomIn color={"white"}/></button>
                                <button onClick={zoomOut}><AiOutlineZoomOut color={"white"}/></button>
                                <button onClick={() => setToggleBack(!toggleBack)}><IoMdAlbums color={"white"}/></button>
                                <button onClick={() => setSelected([])}><AiOutlineClear color={"white"}/></button>
                                <button onClick={() => allTags()}><AiFillTags color={"white"}/></button>
                            </div>
                        </React.Fragment>
                        )}
                    </TransformWrapper>
                </div>
=======
                    <div className="results-card" onWheel={handleZoom}>
                        <TransformWrapper>
                            {({ scale, zoomIn, zoomOut, resetTransform, ...rest }) => (
                                <React.Fragment>
                                    <div className="imageBorders">
                                        <TransformComponent>
                                            <img id="log" className="imageBehind" style={(toggleBack || state == 0) ? { filter: colors[state][3] } : { filter: "brightness(0%)" }} src={route} />
                                            <SVG
                                                sizes={sizes}
                                                newPaths={newPaths}
                                                borders={borders}
                                                colors={colors}
                                                enumeration={enumeration}
                                                state={state}
                                                imageId={props.imageId}
                                                selected={selected}
                                                setSelected={setSelected}
                                                scale={scale}
                                            />
                                        </TransformComponent>
                                    </div>
                                    <div className="tools">
                                        <button onClick={resetTransform}><MdZoomOutMap color={"white"} /></button>
                                        <button onClick={zoomIn}><AiOutlineZoomIn color={"white"} /></button>
                                        <button onClick={zoomOut}><AiOutlineZoomOut color={"white"} /></button>
                                        <button onClick={() => setToggleBack(!toggleBack)}><IoMdAlbums color={"white"} /></button>
                                        <button onClick={() => setSelected([])}><AiOutlineClear color={"white"} /></button>
                                    </div>
                                </React.Fragment>
                            )}
                        </TransformWrapper>
                    </div>
>>>>>>> fe0ea85f5cb581cd14e938e08d9d5fc76104260a
                </div>
            }
        </div>
    );
}

export default AfterUpload;