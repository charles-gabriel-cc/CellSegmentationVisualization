import React, { useState } from 'react'	
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import { green, indigo, lightGreen} from '@material-ui/core/colors';


const Combobox = (props) => {

	const WhiteRadio = withStyles({
		root: {
		  color: "#000000",
		  '&$checked': {
			color: '#000000',
		  },
		},
		checked: {},
	  })((props) => <Radio color="default" {...props} />);
	
	return(
	<FormControl component="fieldset">
		<FormLabel component="legend"></FormLabel>
		<RadioGroup value={props.state} onChange={props.handleState}>
			<FormControlLabel value="0" control={<WhiteRadio size="small"/>} label="None"/>
			<FormControlLabel value="5" control={<WhiteRadio size="small"/>} label="Bound Overlay" />
			<FormControlLabel value="1" control={<WhiteRadio size="small" checked={props.state === '1'}/>} label="Object Overlay" />
		</RadioGroup>
	</FormControl>
	)
}

export default Combobox;