import React from 'react';
import { BsDownload } from 'react-icons/bs'
import './Download.css'
import JSZip from 'jszip'
import saveAs from 'jszip'

const Download = (props) => {

	const API_IMAGE_ENDPOINT = "http://localhost:5000/result/image/"

	const ZIP_ENDPOINT = API_IMAGE_ENDPOINT + props.imageId + '/' + 11;

	const svgFile = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">' + props.innerHtml 
	
	const downloadEmployeeData = () => {
		fetch(ZIP_ENDPOINT)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = `mask.txt`;
					a.click();
				});
			});
	}

	const downloadSvg = () => {
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(svgFile));
		element.setAttribute('download', 'mask.svg');
	  
		element.style.display = 'none';
		document.body.appendChild(element);
	  
		element.click();
	  
		document.body.removeChild(element);
	}

	return (
		<a href={ZIP_ENDPOINT} download>
			<i>Download</i>
		</a>
	)
}
export default Download;