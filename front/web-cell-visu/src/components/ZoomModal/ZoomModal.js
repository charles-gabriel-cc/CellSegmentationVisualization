import React from 'react'
import { Modal, Slider } from '@material-ui/core'

import './ZoomModal.css'

const ZoomModal = (props) => {

    const handleChange = (e, value) => {
        props.updateZoomArea(value)
    }

    return(
        <Modal open={props.open} onClose={props.handleClose} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <div className="inner-modal-container">
                <h5>Zoom Area</h5>
                <div className="custom-slider-container">
                    <Slider
                        min={20}
                        defaultValue={25}
                        value={props.zoomArea}
                        step={1}
                        max={70}
                        color='primary'
                        onChange={handleChange}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default ZoomModal;