import React from 'react';
import { BsDownload }from 'react-icons/bs'
import './Download.css'
import JSZip from 'jszip'
import saveAs from 'jszip'

const Download = (props) => {

	return (
		<a href={props.zip} download>
			<BsDownload
				color={"white"} 
				className="downloadIcon"
			/>
		</a>
	)
}
export default Download;