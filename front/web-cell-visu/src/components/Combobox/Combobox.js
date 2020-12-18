import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  
  export default function NativeSelects() {
    const classes = useStyles();
    const [state, setState] = React.useState({
      age: '',
      name: 'hai',
    });
  
    const handleChange = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
    };
  
    return (
      <div>
        <FormControl className={classes.formControl}>
          <InputLabel>Segmentation Type</InputLabel>
          <Select
            native
            onChange={handleChange}
          >
            <option value={0}>Original Image</option>
            <option value={1}>Segmented Image</option>
          </Select>
        </FormControl>
        </div>
        );
    }