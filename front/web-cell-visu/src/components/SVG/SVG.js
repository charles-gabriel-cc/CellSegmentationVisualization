import React, { useState, useEffect, createRef, useRef }from 'react'
import { Tooltip } from "react-svg-tooltip";

import './SVG.css'
import * as d3 from 'd3'


const SVG = (props) => {

    const API_IMAGE_ENDPOINT = "http://localhost:5000/result/image/"

    const SVG_ENDPOINT = API_IMAGE_ENDPOINT + props.imageId + '/' + 10;
    
    const circleRef = createRef()

    const arrLength = props.newPaths.length;

    const refs = useRef([])

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
        {props.newPaths.map((paths, i) =>
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
                        points="-5,-10 5,-10 0,0"
                        fill="#252631"
                        opacity="0.8"
                        rx={10}
                        ry={10}
                    />
                    <rect
                        x={-30}
                        y={-45}
                        width={60}
                        height={35}
                        rx={10}
                        ry={10}
                        fill="#252631"
                        opacity="0.8"
                    />
                    <text 
                        x={(i < 10) ? -6 : (i < 100) ? -12: -18} 
                        y={-20} 
                        fontSize={25} 
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
                    points={(parseInt(props.newPaths[index].split(" ")[0].replace("M", "")) - 60)+","+(parseInt(props.newPaths[index].split(" ")[1]) - 120)+" "+
                    (parseInt(props.newPaths[index].split(" ")[0].replace("M", "")) + 60) +","+(parseInt(props.newPaths[index].split(" ")[1]) - 120)+" "+
                    (parseInt(props.newPaths[index].split(" ")[0].replace("M", "")))+","+(parseInt(props.newPaths[index].split(" ")[1]) - 40)
                    }
                    fill="#252631"
                    opacity="0.8"
                    rx={10}
                    ry={10}
                />
                <rect
                    x={props.newPaths[index].split(" ")[0].replace("M", "")-230}
                    y={parseInt(props.newPaths[index].split(" ")[1]) - 400}
                    width={480}
                    height={280}
                    rx={100}
                    ry={100}
                    fill="#252631"
                    opacity="0.8"
                />
                <text 
                    x={(index < 10) ? parseInt(props.newPaths[index].split(" ")[0].replace("M", "")) - 30: (index < 100) ? parseInt(props.newPaths[index].split(" ")[0].replace("M", "")) - 90 : parseInt(props.newPaths[index].split(" ")[0].replace("M", "")) - 130} 
                    y={parseInt(props.newPaths[index].split(" ")[1]) - 200} 
                    fontSize={200} 
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