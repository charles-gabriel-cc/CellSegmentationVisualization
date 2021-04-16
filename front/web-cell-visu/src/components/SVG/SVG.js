import React, { useState, useEffect, createRef, useRef }from 'react'
import { Tooltip } from "react-svg-tooltip";

import './SVG.css'
import * as d3 from 'd3'
import ExamplePaths from '../../assets/ExamplePaths.js'


const SVG = (props) => {

    const API_IMAGE_ENDPOINT = "http://localhost:5000/result/image/"

    const SVG_ENDPOINT = API_IMAGE_ENDPOINT + props.imageId + '/' + 10;

    const [ arrPaths, setArrPaths ] = useState(props.newPaths)

    const [choosePath, setChoosePath] = useState(false)
    
    const circleRef = createRef()

    const refs = useRef([])

    if((props.imageId == 1 || props.imageId == 2) && !choosePath) {
        setArrPaths(ExamplePaths(props.imageId - 1))
        setChoosePath(true)
    }
    console.log(arrPaths)

    const arrLength = arrPaths.length;

    const [count, setCount] = useState(1)

    if(refs.current.length !== arrLength) {
        refs.current = Array(arrLength).fill().map((_, i) => refs.current[i] || createRef());
    }


    function getRandomColor(i) {
        const color = ["#f54242","#eff542","#54f542", "#42f2f5", "#0037ff", "#f700ff", "#014a11", "#fa6d2f", "#4b016e"]
        return color[i%9];
    }

    const colors = {
        0:["transparent", "transparent", "1", "brightness(100%)"],
        5:["transparent", "#ff3300", "1", "brightness(50%)"],
        1:[false, "#59de31", "0.3", "brightness(100%)"],
    }
    
    function updateSelected(i) {
        if(!props.selected.includes(i)){
            props.setSelected(arr => [...arr, i]);
        } else {
            props.setSelected(props.selected.filter(item => item !== i))
        }
    }

    return(
    <div className="transforming">
    <svg onLoad={() => setCount(count + 1)} id="svgDiv" version="1.0" xmlns="http://www.w3.org/2000/svg"
        className="imageAbove" viewBox={"0 0 "+ props.sizes[0] + " " + props.sizes[1]}
        preserveAspectRatio="xMidYMid meet">
        <metadata>
        Created by potrace 0.3, written by Peter Selinger 2001-2015
        </metadata>
        <g id="component" transform="scale(0.100000,0.100000)"
            fill="#ffffff">
        {arrPaths.map((paths, i) =>
            <g>
                <path
                    className="path"
                    key={i}
                    id={i}
                    d={paths}
                    onClick={() => updateSelected(i)}
                    ref={refs.current[i]}
                    fill={colors[props.state][0] ? colors[props.state][0]: getRandomColor(i)}
                    stroke={colors[props.state][1]}
                    fillOpacity={colors[props.state][2]}
                    strokeWidth="10"
                />
                <Tooltip triggerRef={refs.current[i]}>
                    <polygon 
                        points={(-5/props.scale) + "," + (-10/props.scale) + " "
                                + (5/props.scale) + "," + (-10/props.scale) + " 0,0"}
                        fill="#252631"
                        opacity="0.8"
                        rx={10}
                        ry={10}
                    />
                    <rect
                        x={-30/props.scale}
                        y={-45/props.scale}
                        width={60/props.scale}
                        height={35/props.scale}
                        rx={10/props.scale}
                        ry={10/props.scale}
                        fill="#252631"
                        opacity="0.8"
                    />
                    <text 
                        x={(i < 10) ? -6/props.scale : (i < 100) ? -12/props.scale: -18/props.scale} 
                        y={-20/props.scale} 
                        fontSize={25/props.scale} 
                        fill="white"
                    >
                        {i}
                    </text>
                </Tooltip>
            </g>
            )
        }
        {props.selected.map((index, i) =>
            <g>
                <polygon 
                    points={(parseInt(arrPaths[index].split(" ")[0].replace("M", "")) - 60/props.scale)+","+(parseInt(arrPaths[index].split(" ")[1]) - 120/props.scale)+" "+
                    (parseInt(arrPaths[index].split(" ")[0].replace("M", "")) + 60/props.scale) +","+(parseInt(arrPaths[index].split(" ")[1]) - 120/props.scale)+" "+
                    (parseInt(arrPaths[index].split(" ")[0].replace("M", "")))+","+(parseInt(arrPaths[index].split(" ")[1]) - 40/props.scale)
                    }
                    fill="#252631"
                    opacity="0.8"
                    rx={10/props.scale}
                    ry={10/props.scale}
                />
                <rect
                    x={(arrPaths[index].split(" ")[0].replace("M", "")-230/props.scale)}
                    y={(parseInt(arrPaths[index].split(" ")[1]) - 400/props.scale)}
                    width={480/props.scale}
                    height={280/props.scale}
                    rx={100/props.scale}
                    ry={100/props.scale}
                    fill="#252631"
                    opacity="0.8"
                />
                <text 
                    x={(index < 10) ? (parseInt(arrPaths[index].split(" ")[0].replace("M", "")) - 30/props.scale): (index < 100) ? (parseInt(arrPaths[index].split(" ")[0].replace("M", "")) - 90/props.scale) : (parseInt(arrPaths[index].split(" ")[0].replace("M", "")) - 130/props.scale)} 
                    y={(parseInt(arrPaths[index].split(" ")[1]) - 200/props.scale)} 
                    fontSize={200/props.scale} 
                    fill="white"
                >
                    {index}
                </text>
            </g>
        )}
        </g>    
    </svg>
    </div>   
    );
}

export default SVG;