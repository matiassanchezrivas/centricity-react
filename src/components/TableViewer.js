import React, { Component } from 'react'
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { FormControl, InputLabel, Select, MenuItem, Container, TextField, Button, Typography, Grid, FormControlLabel, Switch, Input } from '@material-ui/core';
import Modal from './Modal'
import { axiosConfigurations } from '../config/axios'

class cloudformationTemplates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newRow: {},
            viewRow: {},
            modal: 'new',
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
        this.deleteRow = this.deleteRow.bind(this);
        this.updateRow = this.updateRow.bind(this);
        this.onRowAdd = this.onRowAdd.bind(this);
    }

    deleteRow(rowData, tableName) {
        const { keys } = this.props;
        return axiosConfigurations.post('/deleteItem', { id: rowData.id, tableName })
            .then(data => this.props.fetchItems(tableName, keys))
            .catch(e => { alert('Delete error, please try again'); return 'error' })
    }

    updateRow(newData, oldData, tableName) {
        newData.id = oldData.id;
        const { keys } = this.props;
        return axiosConfigurations.put('/putItem', { item: newData, tableName })
            .then(data => this.props.fetchItems(tableName, keys))
            .catch(e => { alert('Delete error, please try again'); return 'error' })
    }

    onRowAdd(newData, tableName) {
        console.log(newData, tableName)
        newData.id = parseInt(newData.id)
        const { keys } = this.props;
        return axiosConfigurations.put('/putItem', { item: newData, tableName })
            .then(data => this.props.fetchItems(tableName, keys))
            .catch(e => { alert('Delete error, please try again'); return 'error' })
    }

    handleCloseModal() {
        this.setState({ openModal: false })
    }

    componentDidMount() {

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
        const { selectedTable, keys, data } = this.props;
        return (
            selectedTable ? <div className='tabla-material'>
                <MaterialTable
                    title={selectedTable}
                    columns={keys.map(key => {
                        let obj = { title: key, field: key }
                        if (key == "id") obj.type = 'numeric';
                        console.log(obj)
                        return obj;
                    })}
                    data={data}
                    actions={[
                        //FREE ACTIONS
                        // {
                        //     icon: 'add_box',
                        //     tooltip: 'Add item',
                        //     onClick: this.clickAddItem,
                        //     isFreeAction: true
                        // },
                    ]}
                    editable={{
                        onRowDelete: oldData => this.deleteRow(oldData, selectedTable),
                        onRowUpdate: (newData, oldData) => this.updateRow(newData, oldData, selectedTable),
                        onRowAdd: (newData) => this.onRowAdd(newData, selectedTable),
                    }}
                />
                <Modal
                    open={openModal}
                    handleClose={this.handleCloseModal}
                >
                    <div>

                    </div>
                </Modal>

            </div> : null
        )
    }
}


const mapDispatchToProps = function (dispatch) {
    return (
        {

        }
    )
}

const mapStateToProps = function (state) {
    return {
        // templates: state.templates.templates
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(cloudformationTemplates);