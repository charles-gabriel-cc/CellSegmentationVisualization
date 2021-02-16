import React, { useState } from 'react'	
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const Combobox = (props) => {
	const useStyles = makeStyles((theme) => ({
		root: {
			fontSize: 17,
			font: 'initial',
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
			color: 'white'
		},
		inputOption: {
			color: 'black',
			fontSize: 18
		},
		inputLabel: {
			color: 'white',
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
		'@media (max-width: 1000px)' : {
			root: {
				fontSize: 50,
				
			},
			inputLabel: {
				fontSize: 50
			},
			icon: {
				fontSize: 35
			},
		}
	}))

	const classes = useStyles();

	const handleChange = (event) => {	
		props.updateType(event.target.value);
	};
	
	return (
		<FormControl className={classes.formControl}>
			<h3>Choose a mask:</h3>
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
						root: classes.root,
					},
				}}
			>   
				<option className={classes.inputOption} value={'0'}></option>
				<option className={classes.inputOption} value={'4'}>Boundary</option>
				<option className={classes.inputOption} value={'5'}>Bound Overlay</option>	
				<option className={classes.inputOption} value={'3'}>Instances RGB</option>
				<option className={classes.inputOption} value={'1'}>Object Overlay</option>
				<option className={classes.inputOption} value={'2'}>Segmentation</option>
			</Select>
        </FormControl>
	);
}

export default Combobox;