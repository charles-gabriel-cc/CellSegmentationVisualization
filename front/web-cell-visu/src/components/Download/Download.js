import React from 'react';
import { BsDownload }from 'react-icons/bs'

const Download = (props) => {

	const API_IMAGE_ENDPOINT = "http://localhost:5000/result/image/"

    const ZIP_ENDPOINT = API_IMAGE_ENDPOINT + props.imageId + '/' + 10;

	const downloadEmployeeData = () => {
		fetch(ZIP_ENDPOINT)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = `mask.svg`;
					a.click();
				});
		});
	}

	return (
		<a onClick={downloadEmployeeData}>
			<i>Download</i>	
		</a>
	)
}
export default Download;