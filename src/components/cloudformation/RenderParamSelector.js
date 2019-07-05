import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, TextField, InputLabel, Select, MenuItem, Typography } from '@material-ui/core';
import CheckList from '../CheckList'


export default function renderParamSelector(props) {
    const { executeRow, k, object, handleChange } = props;
    const key = k;

    return (<div>{
        object.AllowedValues ?
            <FormControl style={{ width: '100%' }}>
                <InputLabel >{key}</InputLabel>
                <Select
                    value={executeRow.Parameters[key]}
                    onChange={(e) => handleChange(key, e, 'Parameters')}
                >
                    {object.AllowedValues.map(option => <MenuItem value={option}>{option}</MenuItem>)}
                </Select>
            </FormControl>
            :
            <TextField
                id={key}
                label={key}
                style={{ width: '100%' }}
                // className={classes.textField}
                value={executeRow.Parameters[key]}
                onChange={(e) => handleChange(key, e, 'Parameters')}
                margin="normal"
            />}
        <Typography variant="subtitle1" id="simple-modal-description">
            Type: {object.Type}
        </Typography>
        <Typography variant="subtitle1" id="simple-modal-description">
            Description: {object.Description}
        </Typography></div>)
}

