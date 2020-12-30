import React from 'react'
import { Modal, Slider } from '@material-ui/core'

import './ZoomModal.css'

const ZoomModal = (props) => {

    const handleChange = (e, value) => {
        props.updateZoomArea(value)
    }

    const handleOther = (e, value) => {
        props.updateZoomRate(value)
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
                <h5>Zoom Rate</h5>
                <div className="custom-slider-container">
                    <Slider
                        min={500}
                        defaultValue={640}
                        value={props.zoomRate}
                        step={1}
                        max={2000}
                        color='primary'
                        onChange={handleOther}
                    />
                </div>
            </div>
        </Modal>
    )
}
    
export default ZoomModal;