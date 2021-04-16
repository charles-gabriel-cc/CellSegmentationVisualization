import React, { useState } from 'react'	
import { makeStyles } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';


const Combobox = (props) => {

	const WhiteRadio = withStyles({
		root: {
		  color: "#ffffff",
		  '&$checked': {
			color: indigo[600],
		  },
		},
		checked: {},
	  })((props) => <Radio color="default" {...props} />);
	
	return(
	<FormControl component="fieldset">
		<FormLabel component="legend"></FormLabel>
		<RadioGroup aria-label="gender" name="gender1" value={props.state} onChange={props.handleState}>
			<FormControlLabel value="0" control={<WhiteRadio />} label="None" />
			<FormControlLabel value="5" control={<WhiteRadio />} label="Bound Overlay" />
			<FormControlLabel value="1" control={<WhiteRadio />} label="Object Overlay" />
		</RadioGroup>
	</FormControl>
	)
}

export default Combobox;