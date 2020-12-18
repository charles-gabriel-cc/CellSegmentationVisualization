import React from 'react'

import './ProgressBar.css'

const ProgressBar = (props) => {
    return(
        <div className="progress-bar">
            <div className="filler" style={{width: `${props.percentage}%`}}/>
        </div>
    );
}

export default ProgressBar;