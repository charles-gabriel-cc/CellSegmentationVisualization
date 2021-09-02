import React, { useState } from 'react'
import ProgressBar from '../ProgressBar/ProgressBar'
import Combobox from '../Combobox/Combobox.js'
import Download from '../Download/Download.js'
import SVG from '../SVG/SVG.js'

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"

import { FiCornerUpLeft } from 'react-icons/fi'
import { BsDownload, BsInfoSquare } from 'react-icons/bs'
import { IoMdAlbums } from 'react-icons/io'
import { AiOutlineZoomIn, AiOutlineZoomOut, AiOutlineClear } from 'react-icons/ai'
import { MdPhotoSizeSelectActual } from 'react-icons/md'
import { MdZoomOutMap } from 'react-icons/md'
import { FiGithub } from 'react-icons/fi'
import {AiFillTags} from 'react-icons/ai'
import { ImListNumbered } from 'react-icons/im'

import cellImg from '../../assets/black-white-cells.svg'

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

import cellSvg from '../../assets/black-white-cells.svg'

const AfterUpload = (props) => {

    const API_IMAGE_ENDPOINT = "https://www.jcell.org:3984/result/image/"

    const JSON_ENDPOINT = API_IMAGE_ENDPOINT + props.imageId + '/' + 9;

    const [open, setOpen] = useState(false)
    const [zoomArea, setZoomArea] = useState(45)
    const [zoomRate, setZoomRate ] = useState(640)
    const [ paths, setPaths ] = useState(false)
    const [ state, setState ] = React.useState('1');
    const [ toggle, setToggle ] = useState(false)
    const [ sizes, setSizes ] = useState(false)
    const [ accept, setAccept ] = useState(false)
    const [newPaths, setNewPaths] = useState(false)
    const [enumeration, setEnumeration] = useState(false)
    const [borders, setBorders] = useState(true);
    const [innerHtml, setInnerHtml] = useState("")
    const [numberToggle, setNumberToggle] = useState(true)

    const color_value = 'black'

    const route = API_IMAGE_ENDPOINT + props.imageId + '/' + 0

    const updateInnerHtml = (newValue) => {
        setInnerHtml(newValue)
    }

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

    const updateSelected = () => {
        setSelected([])
        setNumberToggle(true)
    }

    const [collapsed, setCollapsed] = useState(true)

    const handleState = (event) => {
        setState(event.target.value)
    }

    function allTags() {
        let all = []
        for(let i = 0; i < newPaths.length; i++) {
            all.push(i)
        }
        setSelected(all)
        setNumberToggle(false)
    }

    return(
        <div>
        {!props.pollingState || !newPaths ? undefined :
        <div className="after-upload-container">
            <img className="background-bg" src={cellSvg}></img>
            <ProSidebar collapsed={collapsed} style={{borderRight: "1px solid black" }}>
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
                            <Download imageId={props.imageId} innerHtml={innerHtml}/>
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
                                        updateInnerHtml={updateInnerHtml}
                                    />
                                </TransformComponent>
                            </div>
                            <div className="tools">
                                <button onClick={resetTransform} data-toggle="tooltip" title={"resize"}><MdZoomOutMap color={color_value} /></button>
                                <button onClick={zoomIn} data-toggle="tooltip" title={"zoom"}><AiOutlineZoomIn color={color_value}/></button>
                                <button onClick={zoomOut} data-toggle="tooltip" title={"zoom"}><AiOutlineZoomOut color={color_value}/></button>
                                <button onClick={() => setToggleBack(!toggleBack)} data-toggle="tooltip" title={"change background"}><IoMdAlbums color={color_value}/></button>
                                <button onClick={numberToggle ? () => allTags() : () => updateSelected()} data-toggle="tooltip" title={"enable/unable tags"}><ImListNumbered color={color_value}/></button>
                            </div>
                        </React.Fragment>
                        )}
                    </TransformWrapper>
                </div>
                </div>
            }
        </div>
    );
}

export default AfterUpload;