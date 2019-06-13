import React, { Component } from 'react'
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
// import { fetchTemplates } from '../actions-creator/templates'
import { FormControl, InputLabel, Select, MenuItem, Container, TextField, Button, Typography, Grid, FormControlLabel, Switch, Input } from '@material-ui/core';
import Modal from '../components/Modal'
import axiosConfigurations from '../config/axiosCloudformation'

class cloudformationTemplates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newRow: {},
            viewRow: {},
            modal: 'new',
            data: this.props.templates,
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Created by', field: 'created_by' },
                { title: 'Approved by', field: 'approved_by' },
                { title: 'Description', field: 'description' },
            ],
        };
        // this.reset = this.reset.bind(this);
        // this.renderNew = this.renderNew.bind(this);
        // this.renderView = this.renderView.bind(this);
        // this.saveTemplate = this.saveTemplate.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.clickViewRow = this.clickViewRow.bind(this);
        // this.renderExecute = this.renderExecute.bind(this);
        // this.disableSaveBtn = this.disableSaveBtn.bind(this);
        // this.executeTemplate = this.executeTemplate.bind(this);
        // this.clickAddTemplate = this.clickAddTemplate.bind(this);
        // this.handleCloseModal = this.handleCloseModal.bind(this);
        // this.fileChangedHandler = this.fileChangedHandler.bind(this);
        // this.renderParamSelector = this.renderParamSelector.bind(this)
        // this.clickExecuteTemplate = this.clickExecuteTemplate.bind(this);

    }

    deleteRow(rowData) {
        return axiosConfigurations.post('/deleteTemplate', { id: rowData.id })
            .then(data => this.props.fetchTemplates().then(d => this.setState({ openModal: false })))
            .catch(e => { alert('Delete error, please try again'); return 'error' })
    }

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

    executeTemplate() {
        const { id, selectedAccount, Parameters } = this.state.executeRow;

        console.log(id, selectedAccount)
        axiosConfigurations.post('/executeTemplate', { template_id: id, cloud_account_id: selectedAccount, Parameters })
            .then(response => response.data)
            .catch(e => { })
    }

    modalSwitch() {
        switch (this.state.modal) {
            case 'view':
                return this.renderView();
            case 'new':
                return this.renderNew();
            case 'execute':
                return this.renderExecute();
            default:
                return this.renderView();
        }
    }

    handleChange(field, e, param) {
        if (!param) {
            this.setState({
                [this.state.modal + 'Row']: { ...this.state[this.state.modal + 'Row'], [field]: e.target ? e.target.value : e }
            }, () => console.log(this.state))
        } else {
            this.setState({
                executeRow: { ...this.state.executeRow, Parameters: { ...this.state.executeRow.Parameters, [field]: e.target.value } }
            }, () => console.log(this.state))
        }
    }

    reset() {
        console.log('vaule', this.inputFile.value)
        this.inputFile.value = ''
        this.setState({
            modal: 'new',
            newRow: {
                name: '',
                description: '',
                fileName: '',
                json: {},
                approved: true,
                jsonFormatter: {
                    notChanged: true,
                }
            },
            openModal: true,
        })
    }

    async clickViewRow(event, rowData) {
        console.log(rowData)
        const templateJSON = await axiosConfigurations.post('/getTemplateFromS3', { id: rowData.id })
            .then(response => response.data)
            .catch(e => { })
        console.log(templateJSON)
        this.setState({
            modal: 'view',
            templateJSON: templateJSON,
            viewRow: {
                jsonFormatter: {
                    notChanged: true,
                    jsObject: templateJSON,
                },
                ...rowData
            },
            openModal: true,
        })
    }

    async clickAddTemplate(rowData) {
        this.setState({
            modal: 'new',
            newRow: {
                name: '',
                description: '',
                fileName: '',
                json: {},
                approved: true,
                jsonFormatter: {
                    notChanged: true,
                }
            },
            openModal: true,
        })
    }

    async clickExecuteTemplate(event, rowData) {
        //Get cloudaccounts
        const ca = await axiosConfigurations.post('/getCloudAccounts', { customer_id: 19 }) //TODO replace customer_id
            .then(response => response.data)
            .catch(e => { })
        //Get template from s3
        const templateJSON = await axiosConfigurations.post('/getTemplateFromS3', { id: rowData.id })
            .then(response => response.data)
            .catch(e => { })
        console.log('TEMPLATE', templateJSON)

        let Parameters = {}
        if (templateJSON.Parameters) {
            Object.keys(templateJSON.Parameters).forEach(param => {
                Parameters[param] = templateJSON.Parameters[param].Default
            })
        }
        console.log(Parameters)

        this.setState({
            modal: 'execute',
            templateJSON,

            //set executeRow params
            executeRow: { ...rowData, cloudAccounts: ca, Parameters, },

            openModal: true,
        })
    }

    saveTemplate() {
        const { modal } = this.state;
        const { name, description, jsonFormatter, id } = this.state[modal + 'Row']
        const approved = true;
        let cf = jsonFormatter.jsObject;
        if (modal === 'view' && jsonFormatter.notChanged) {
            cf = { notChanged: true }
        }
        axiosConfigurations.post('/saveTemplate', {
            name, cf, description, approved, id
        }).then(data =>
            this.props.fetchTemplates()
                .then(data => this.setState({ openModal: false }))
        )
            .catch(e => console.log(e))
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
                        // ROW ACTIONS
                        {
                            icon: 'play_circle_filled',
                            tooltip: 'Execute template',
                            onClick: this.clickExecuteTemplate,
                        },
                        {
                            icon: 'edit',
                            tooltip: 'Edit template',
                            onClick: this.clickViewRow,
                        },
                        //FREE ACTIONS
                        {
                            icon: 'add_box',
                            tooltip: 'Add template',
                            onClick: this.clickAddTemplate,
                            isFreeAction: true
                        },
                    ]}
                    editable={{
                        onRowDelete: oldData => this.deleteRow(oldData)
                    }}
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
            // fetchTemplates: () => dispatch(fetchTemplates()),
        }
    )
}

const mapStateToProps = function (state) {
    return {
        // templates: state.templates.templates
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(cloudformationTemplates);