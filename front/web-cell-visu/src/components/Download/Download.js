import React from 'react';
import { BsDownload } from 'react-icons/bs'
import './Download.css'

const Download = (props) => {

	const API_IMAGE_ENDPOINT = "https://www.jcell.org:3984/result/image/"

	const ZIP_ENDPOINT = API_IMAGE_ENDPOINT + props.imageId + '/' + 10;

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
		<div>
			<a onClick={downloadSvg}>
				<i>Download</i>
			</a>
		</div>
	)
}
export default Download;