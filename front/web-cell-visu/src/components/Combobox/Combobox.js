import React, { useState } from 'react'	
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Combobox = (props) => {
	const useStyles = makeStyles((theme) => ({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
			color: 'white'
		},
		inputLabel: {
			color: 'white',

		},
		inputOption: {
			color: 'black'
		},
		select: {
			color: 'white',
			'&:before': {
				borderColor: 'white',
			},
			'&:after': {
				borderColor: 'white',
			}
		},
		icon: {
			fill: 'white',
		},
	}))

	const classes = useStyles();

	const handleChange = (event) => {	
		props.updateType(event.target.value);
	};
	
	return (
		<FormControl className={classes.formControl}>
			<h3 className={classes.inputLabel}>Segmentation Type:</h3>
			<Select 
				className={classes.select}
				native
				value={props.type}
				onChange={handleChange}
				inputProps = {{
					name: 'type',
					id: 'segmentation-type',
					classes: {
						icon: classes.icon,
					},
				}}
			>   
				<option className={classes.inputOption} value={'0'}>Original Image</option>
				<option className={classes.inputOption} value={'1'}>Segmented Image</option>
				<option className={classes.inputOption} value={'2'}>Segmentation</option>
				<option className={classes.inputOption} value={'3'}>Other Image</option>
				<option className={classes.inputOption} value={'4'}>Other Image</option>
				<option className={classes.inputOption} value={'5'}>Other Image</option>
				<option className={classes.inputOption} value={'6'}>Other Image</option>
			</Select>
        </FormControl>
	);
}

export default Combobox;