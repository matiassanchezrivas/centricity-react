import React from 'react';
import { Grid, TextField, Button, Container, Typography, FormControlLabel, Switch } from '@material-ui/core';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

export default function RenderExecute(props) {
    const { viewRow, templateJSON, handleChange, saveTemplate, handleCloseModal, handleChangeSwitch, deleteRow, allowed } = props;
    const disableSaveBtn = !viewRow.name || viewRow.name === '' || !viewRow.description || viewRow.description === '' || !viewRow.jsonFormatter || viewRow.jsonFormatter.error

    return (
        <Container>
            <Typography variant="h6" id="modal-title">
                {allowed ? 'Edit template' : 'View template'}
            </Typography>
            {allowed && <Typography variant="subtitle1" id="simple-modal-description">
                Click save to update the template
          </Typography>}
            <form noValidate autoComplete="off">
                <Grid item xs={12}>
                    <TextField
                        id="name"
                        label="Name"
                        style={{ width: '100%' }}
                        disabled={!allowed}
                        // className={classes.textField}
                        value={viewRow.name}
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
                        value={viewRow.description}
                        multiline
                        disabled={!allowed}
                        rowsMax="4"
                        onChange={(e) => handleChange('description', e)}
                        margin="normal"
                    />
                </Grid>

                {allowed && <FormControlLabel
                    control={
                        <Switch checked={viewRow.approved} onChange={(e) => handleChangeSwitch(allowed)} value="Approved" />
                    }
                    label="Approved"
                />}
                <JSONInput
                    id='a_unique_id'
                    placeholder={templateJSON}
                    // colors={'darktheme'}

                    viewOnly={!allowed}
                    locale={locale}
                    height='250px'
                    onChange={(e) => handleChange('jsonFormatter', e)}
                />
                <Grid item xs={12}>
                    {allowed && <Button onClick={(e) => deleteRow(viewRow)}>
                        Delete
                    </Button>}
                    {allowed && <Button
                        onClick={saveTemplate}
                        color="primary"
                        disabled={disableSaveBtn}
                    >
                        Save
                    </Button>}

                    <Button onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Grid>
            </form>
        </Container>
    )
}
