import React, {useCallback} from 'react'

import {useDropzone} from 'react-dropzone'

import { BsUpload } from 'react-icons/bs'

const UploadDropzone = (props) => {

    const uploadData = (file) => {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('gpu', false)

        const options = {
            method: 'POST',
            body: formData,
        }

        const API_ENDPOINT = "http://localhost:5000/segmentation/"

        fetch(API_ENDPOINT, options).then(res => res.json()).then(res => {
            props.updateImageId(res['id'])
        })
    }

    const onDrop = useCallback(acceptedFiles => {
        const fileType = acceptedFiles[0].type;
        const file = acceptedFiles[0];
        if(fileType.substring(0,5) != "image"){
            alert('Please select an image file.')
        }
        else{
            props.updateImagePath(acceptedFiles[0].path)
            uploadData(file)
        }
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const customStyle={
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        border: "none",
        textAlign: "center",
    }

    return (
    <div {...getRootProps()} style={customStyle}>
        <input {...getInputProps()} />
        <BsUpload size={160} color={"white"} style={{marginBottom: "2rem"}}/>
        {
        isDragActive ?
            <div className="upload-help-text">
                <h2>Drop the images here, or select one example image</h2>
            </div> :
            <div className="upload-help-text">
                <h2>Drag 'n' drop some image here, or click to select an example image</h2>
            </div>
        }
    </div>
    )
}

export default UploadDropzone;