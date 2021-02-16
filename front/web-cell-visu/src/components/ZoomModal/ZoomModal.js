import React, { useState } from 'react'
import { Modal, Slider } from '@material-ui/core'
import Switch from "react-switch";

import './ZoomModal.css'

const ZoomModal = (props) => {
    const [checked, setChecked] = useState(false)


    const handleChecked = (newCheck) => {
        setChecked(newCheck)
        props.updateTakePaths()
    }

    return(
        <Modal open={props.open} onClose={props.handleClose} style={{display: "flex", justifyContent: "center", alignItems: "center", }}>
            <div className="inner-modal-container">
                <span>Enable enumeration</span>
                <Switch className="switch" onColor="#454759" onChange={handleChecked} checked={checked} disabled={!props.newPaths}/>
            </div>
        </Modal>
    )
}
    
export default ZoomModal;