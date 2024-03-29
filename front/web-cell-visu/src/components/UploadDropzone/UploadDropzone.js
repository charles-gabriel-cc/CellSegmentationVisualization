import React, { useCallback } from 'react'

import { useDropzone } from 'react-dropzone'

import { BsUpload } from 'react-icons/bs'

import './UploadDropzone.css'

const UploadDropzone = (props) => {

    const uploadData = (file) => {
        const formData = new FormData()
        formData.append('image', file)
        formData.append('model', props.model)
        formData.append('gpu', false)

        const options = {
            method: 'POST',
            body: formData,
        }

        const API_ENDPOINT = "https://www.jcell.org:3984/segmentation/"

        fetch(API_ENDPOINT, options).then(res => res.json()).then(res => {
            props.updateImageId(res['id'])
        })
    }

    const onDrop = useCallback(acceptedFiles => {
        const fileType = acceptedFiles[0].type;
        const file = acceptedFiles[0];
        console.log(acceptedFiles)
        if (fileType.substring(0, 5) != "image") {
            alert('Please select an image file.')
        }
        else {
            props.updateImagePath(acceptedFiles[0].path)
            uploadData(file)
        }
    }, [])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} className="upload-container" data-toggle="tooltip" title={"Try to choose a model before upload"}>
            <input {...getInputProps()} />
            Submit an image
        </div>
    )
}

export default UploadDropzone;