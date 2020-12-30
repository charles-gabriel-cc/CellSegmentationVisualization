import React from 'react';
import { BsDownload }from 'react-icons/bs'

const Download = (props) => {

	const downloadEmployeeData = () => {
		fetch(props.route)
			.then(response => {
				response.blob().then(blob => {
					let url = window.URL.createObjectURL(blob);
					let a = document.createElement('a');
					a.href = url;
					a.download = `${props.imageId}.png`;
					a.click();
				});
		});
	}
	return (
		<button onClick={downloadEmployeeData}>
			<BsDownload
				size={54} 
				color={"white"} 
				style={{backgroundColor: "transparent"}}
			/>
		</button>
	)
}
export default Download;