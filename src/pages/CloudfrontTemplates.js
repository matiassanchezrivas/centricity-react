import React, { Component } from 'react'
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { fetchTemplates } from '../actions-creator/templates'
import { Container, TextField, Button, Typography, Grid, FormControlLabel, Switch, Input } from '@material-ui/core';
import Modal from '../components/Modal'
import axiosCF from '../config/axiosCloudfront'
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';


class CloudfrontTemplates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Created by', field: 'created_by' },
                { title: 'Approved by', field: 'approved_by' },
                { title: 'Description', field: 'description' },
            ],
            data: this.props.templates,
            selectedRow: {}
        };
        this.reset = this.reset.bind(this);
        this.renderNew = this.renderNew.bind(this);
        this.renderView = this.renderView.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clickViewRow = this.clickViewRow.bind(this);
        this.clickAddTemplate = this.clickAddTemplate.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this)
    }

    deleteRow() { }

    handleCloseModal() {
        this.setState({ openModal: false })
    }

    componentDidMount() {
        this.props.fetchTemplates();
    }

    componentDidUpdate(prevProps) {
        if (this.props.templates !== prevProps.templates) {
            console.log('act')
            this.setState({ data: this.props.templates });
        }
    }

    fileChangedHandler(e) {
        e.preventDefault();
        console.log(e.target.files)
        if (e.target.files.length) {
            this.setState({
                loadImage: true
            })
            const file = e.target.files[0];
            if (file.type !== 'application/json') {
                e.target.value = null;
                return alert('File should be type application/json')
            }
            const reader = new FileReader();
            reader.onload = (event) => {
                this.setState({
                    newRow: { ...this.state.newRow, json: JSON.parse(event.target.result) }
                })
                console.log(event.target.result)
            };
            reader.readAsText(file);
        }
    }

    modalSwitch() {
        switch (this.state.modal) {
            case 'view':
                return this.renderView();
            case 'new':
                return this.renderNew();
            default:
                return this.renderView();
        }
    }

    handleChange(field) {
        console.log(field)
    }

    reset() {

    }

    async clickViewRow(event, rowData) {
        // Do save operation
        console.log(event, rowData)
        const templateJSON = await axiosCF.post('/getTemplateFromS3', { id: rowData.id })
            .then(response => response.data)
            .catch(e => { })
        console.log(templateJSON)
        this.setState({
            modal: 'view',
            templateJSON: templateJSON,
            selectedRow: rowData,
            openModal: true,
        })
    }

    async clickAddTemplate(event) {
        // Do save operation
        console.log(event)
        this.setState({
            modal: 'new',
            newRow: {
                name: '',
                description: '',
                fileName: '',
                json: {},
                approved: true,
            },
            openModal: true,
        })
    }

    renderView() {
        const { selectedRow, templateJSON } = this.state;
        return (
            <Container>
                <Typography variant="h6" id="modal-title">
                    Edit template
          </Typography>
                <Typography variant="subtitle1" id="simple-modal-description">
                    Click save to update the template
          </Typography>
                <form noValidate autoComplete="off">
                    <Grid item xs={12}>
                        <TextField
                            id="name"
                            label="Name"
                            style={{ width: '100%' }}
                            // className={classes.textField}
                            value={selectedRow.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="description"
                            label="Description"
                            style={{ width: '100%' }}
                            // className={classes.textField}
                            value={selectedRow.description}
                            onChange={this.handleChange('description')}
                            margin="normal"
                        />
                    </Grid>

                    <FormControlLabel
                        control={
                            <Switch checked={this.state.selectedRow.checked} onChange={this.handleChange('approved')} value="Approved" />
                        }
                        label="Approved"
                    />
                    <JSONInput
                        id='a_unique_id'
                        placeholder={templateJSON}
                        // colors={'darktheme'}
                        locale={locale}
                        height='250px'
                    />
                    <Grid item xs={12}>
                        <Button onClick={this.deleteRow(selectedRow)}>
                            Delete
                    </Button>
                        <Button onClick={this.saveTemplate}>
                            Save
                    </Button>
                        <Button onClick={this.handleCloseModal}>
                            Cancel
                    </Button>
                    </Grid>
                </form>
            </Container>
        )
    }

    renderNew() {
        const { newRow } = this.state;
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
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="description"
                            label="Description"
                            style={{ width: '100%' }}
                            // className={classes.textField}
                            value={newRow.description}
                            onChange={this.handleChange('description')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input label="jasd" type="file"
                            style={{ width: '100%' }}
                            onClick={e => console.log(e)}
                            accept="application/json"
                            onChange={this.fileChangedHandler}
                        />
                    </Grid>
                    <FormControlLabel
                        control={
                            <Switch checked={this.state.newRow.approved} onChange={this.handleChange('approved')} value="Approved" />
                        }
                        label="Approved"
                    />
                    <JSONInput
                        id='a_unique_id'
                        placeholder={newRow.json}
                        // colors={'darktheme'}
                        locale={locale}
                        height='250px'

                    />
                    <Grid item xs={12}>
                        <Button onClick={this.reset}>
                            Reset
                    </Button>
                        <Button onClick={this.saveTemplate}>
                            Save
                    </Button>
                        <Button onClick={this.handleCloseModal}>
                            Cancel
                    </Button>
                    </Grid>
                </form>
            </Container>)
    }

    render() {
        const { state, setState } = this;
        const { openModal } = state;
        return (
            <div className='tabla-material'>
                <MaterialTable
                    title="Centricity Templates"
                    columns={state.columns}
                    data={state.data}
                    actions={[
                        {
                            icon: 'edit',
                            tooltip: 'Edit template',
                            onClick: this.clickViewRow,
                        },
                        {
                            icon: 'add_box',
                            tooltip: 'Add template',
                            onClick: this.clickAddTemplate,
                            isFreeAction: true
                        }
                    ]}
                />
                <Modal
                    open={openModal}
                    handleClose={this.handleCloseModal}
                >
                    <div>
                        {this.modalSwitch()}
                    </div>
                </Modal>

            </div>
        )
    }
}


const mapDispatchToProps = function (dispatch) {
    return (
        {
            fetchTemplates: () => dispatch(fetchTemplates()),
        }
    )
}

const mapStateToProps = function (state) {
    return {
        templates: state.templates.templates
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CloudfrontTemplates);