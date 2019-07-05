import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button, Container, Typography } from '@material-ui/core';
import CheckList from '../CheckList'
import RenderParamSelector from './RenderParamSelector'

export default function RenderExecute(props) {
    const { executeRow, templateJSON, handleChangeChecked, handleChange, executeTemplate, handleCloseModal } = props;
    return (
        <Container>
            <Typography variant="h6" id="modal-title">
                Execute template
          </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
                Click execute to confirm execution with the provided params
          </Typography>
            <Typography variant="h6" id="modal-title">
                Settings
          </Typography>
            <form noValidate autoComplete="off">
                <Grid item xs={12}>
                    <TextField
                        id="stackname"
                        label="Stackname"
                        style={{ width: '100%' }}
                        // className={classes.textField}
                        value={executeRow.stackname}
                        onChange={(e) => handleChange('stackname', e)}
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={12}>
                    <CheckList items={executeRow.cloudAccounts.map(ca => ca.name)} handleToggle={handleChangeChecked} checked={executeRow.selectedAccounts} />
                </Grid>


                {templateJSON && templateJSON.Parameters && <Typography variant="h6" id="modal-title"> Parameters </Typography>}
                {templateJSON && templateJSON.Parameters && Object.keys(templateJSON.Parameters).map((key, i) => <RenderParamSelector handleChange={handleChange} executeRow={executeRow} executeTemplate={executeTemplate} handleCloseModal={handleCloseModal} key={i} k={key} object={templateJSON.Parameters[key]} />)}

                <Grid item xs={12}>
                    <Button
                        onClick={executeTemplate}
                        color="primary"
                    >
                        Execute
                        </Button>
                    <Button onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Grid>
            </form>
        </Container>
    )
}

