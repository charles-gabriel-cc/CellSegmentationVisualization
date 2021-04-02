import React, { useState } from 'react'
import { Modal, Slider } from '@material-ui/core'
import Switch from "react-switch";
import Download from '../Download/Download.js'

import './ZoomModal.css'

const ZoomModal = (props) => {
    const [checked, setChecked] = useState(false)
    const [borderChecked, setBorderChecked] = useState(false)

    const handleChecked = (newCheck) => {
        setChecked(newCheck)
        props.updateEnumeration()
    }
    
    const handleBorderChecked = (newCheck) => {
        setBorderChecked(newCheck)
        props.updateBorders()
    }

    return(
        <Modal open={props.open} onClose={props.handleClose} style={{display: "flex", justifyContent: "center", alignItems: "center", }}>
            <div className="inner-modal-container">
                <span>Enable enumeration</span>
                <Switch className="switch" onColor="#454759" onChange={handleChecked} checked={checked} disabled={!props.newPaths}/>
                <Download imageId={props.imageId} className="download" disabled={!props.newPaths}/>
            </div>
        </Modal>
    )
}
    
export default ZoomModal;