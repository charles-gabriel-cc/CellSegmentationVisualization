import React from 'react';
import { BsDownload }from 'react-icons/bs'

const Download = (props) => {

	const API_IMAGE_ENDPOINT = "http://localhost:5000/result/image/"

    const ZIP_ENDPOINT = API_IMAGE_ENDPOINT + props.imageId + '/' + 11;

	return (
		<a href={ZIP_ENDPOINT} download>
			<i>Download</i>
		</a>
	)
}
export default Download;