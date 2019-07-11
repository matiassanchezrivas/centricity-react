import React, { useRef } from 'react';
import { Input, Grid, TextField, Button, Container, Typography, FormControlLabel, Switch } from '@material-ui/core';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { axiosCloudformation } from '../../config/axios'

export default function RenderNew(props) {
    const inputFile = useRef(null);
    const { handleCloseModal, fetchTemplates, allowed } = props;

    const [newRow, setRow] = React.useState({ approved: allowed });

    const handleChange = (field, e) => setRow({ ...newRow, [field]: e.target ? e.target.value : e })
    const handleChangeSwitch = e => setRow({ ...newRow, approved: allowed ? !newRow.approved : false })
    const fileChangedHandler = (e) => {
        e.preventDefault();
        if (e.target.files.length) {
            const file = e.target.files[0];
            if (file.type !== 'application/json') { e.target.value = null; return alert('File should be type application/json') }
            const reader = new FileReader();
            reader.onload = (event) => setRow({ ...newRow, json: JSON.parse(event.target.result), jsonFormatter: { jsObject: JSON.parse(event.target.result) } });
            reader.readAsText(file);
        }
    }

    const reset = () => {
        setRow({ name: '', description: '', fileName: '', json: {}, approved: allowed, jsonFormatter: { notChanged: true } })
        inputFile.current.value = null
    }

    const saveTemplate = () => {
        const { name, description, jsonFormatter, id, approved } = newRow;
        let cf = jsonFormatter.jsObject;
        axiosCloudformation.post('/saveTemplate', { name, cf, description, approved: allowed ? approved : false, id })
            .then(data => fetchTemplates().then(data => handleCloseModal()))
            .catch(e => console.log(e))
    }

    const disableSaveBtn = !newRow.name || newRow.name === '' || !newRow.description || newRow.description === '' || !newRow.jsonFormatter || newRow.jsonFormatter.error
    return (
        <Container>
            <Typography variant="h6" id="modal-title">
                New template
      </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
                Click save to send template
      </Typography>
            <form noValidate autoComplete="off">
                <Grid item xs={12}>
                    <TextField
                        id="name"
                        label="Name"
                        style={{ width: '100%' }}
                        // className={classes.textField}
                        value={newRow.name}
                        onChange={(e) => handleChange('name', e)}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="description"
                        label="Description"
                        style={{ width: '100%' }}
                        // className={classes.textField}
                        multiline
                        rowsMax="4"
                        value={newRow.description}
                        onChange={(e) => handleChange('description', e)}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Input label="jasd" type="file"
                        style={{ width: '100%' }}
                        onClick={e => console.log(e)}
                        accept="application/json"
                        onChange={fileChangedHandler}
                        inputRef={inputFile}
                    />
                </Grid>
                <FormControlLabel
                    control={
                        <Switch checked={newRow.approved} onChange={handleChangeSwitch} value="Approved" />
                    }
                    label="Approved"
                />
                <JSONInput
                    id='a_unique_id'
                    placeholder={newRow.json}
                    // colors={'darktheme'}
                    locale={locale}
                    height='250px'
                    onChange={(e) => handleChange('jsonFormatter', e)}
                />
                <Grid item xs={12}>
                    <Button onClick={() => reset()}>
                        Reset
                </Button>
                    <Button disabled={disableSaveBtn} onClick={saveTemplate}>
                        Save
                </Button>
                    <Button onClick={handleCloseModal}>
                        Cancel
                </Button>
                </Grid>
            </form>
        </Container>
    )
}

