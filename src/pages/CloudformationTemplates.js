import React from 'react'
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { fetchTemplates, fetchStackEvents } from '../actions-creator/templates'
import { Paper, Breadcrumbs, Link, FormControl, InputLabel, Select, MenuItem, Container, TextField, Button, Typography, Grid, FormControlLabel, Switch, Input } from '@material-ui/core';
import Modal from '../components/Modal'
import { axiosCloudformation } from '../config/axios'
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import ExecutionLogsView from '../components/cloudformation/ExecutionLogsView'
import CheckList from '../components/CheckList'


class cloudformationTemplates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: "list",
            newRow: {},
            viewRow: {},
            executeRow: {
                selectedAccounts: []
            },
            logs: {},
            modal: 'new',
            data: this.props.templates,
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Created by', field: 'created_by' },
                { title: 'Approved by', field: 'approved_by' },
                { title: 'Description', field: 'description' },
            ],

        };
        this.reset = this.reset.bind(this);
        this.renderNew = this.renderNew.bind(this);
        this.renderView = this.renderView.bind(this);
        this.onChangeTab = this.onChangeTab.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clickViewRow = this.clickViewRow.bind(this);
        this.renderExecute = this.renderExecute.bind(this);
        this.disableSaveBtn = this.disableSaveBtn.bind(this);
        this.executeTemplate = this.executeTemplate.bind(this);
        this.clickAddTemplate = this.clickAddTemplate.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.fileChangedHandler = this.fileChangedHandler.bind(this);
        this.renderParamSelector = this.renderParamSelector.bind(this);
        this.handleChangeChecked = this.handleChangeChecked.bind(this);
        this.clickExecuteTemplate = this.clickExecuteTemplate.bind(this);
    }

    deleteRow(rowData) {
        return axiosCloudformation.post('/deleteTemplate', { id: rowData.id })
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
        const { id, cloudAccounts, Parameters, stackName, selectedAccounts } = this.state.executeRow;
        const cloud_accounts = selectedAccounts.map(acname => {
            let ac = cloudAccounts.find(ca => ca.name === acname)
            return ac ? ac.id : null;
        }).filter(el => !!el)
        console.log(cloud_accounts);
        const date = (new Date()).getTime();
        axiosCloudformation.post('/executeTemplate', { template_id: id, cloud_accounts, Parameters, stackName })
            .then(response => response.data)
            .then(data => {
                console.log('data', data);
                this.props.fetchStackEvents({ stackName, cloud_account_id: cloud_accounts[0], date })
                    .then(() => this.setState({
                        logs: {
                            stackName,
                            cloud_accounts,
                            cloud_accounts_responses: data.response,
                            date
                        },
                        state: 'logs',
                        selectedLogTab: cloud_accounts[0],
                    }))

            })
            .catch(e => { console.log(e) })
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
                    newRow: {
                        ...this.state.newRow,
                        json: JSON.parse(event.target.result),
                        jsonFormatter: {
                            jsObject: JSON.parse(event.target.result)
                        }
                    }
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
            case 'execute':
                return this.renderExecute();
            case 'logs':
                return this.renderLogs();
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
        const templateJSON = await axiosCloudformation.post('/getTemplateFromS3', { id: rowData.id })
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
        const { currentClient } = this.props;
        const ca = await axiosCloudformation.post('/getCloudAccounts', { customer_id: currentClient.id }) //TODO replace customer_id
            .then(response => response.data)
            .catch(e => { })
        //Get template from s3
        const templateJSON = await axiosCloudformation.post('/getTemplateFromS3', { id: rowData.id })
            .then(response => response.data)
            .catch(e => { })
        console.log('TEMPLATE', templateJSON)

        let Parameters = {}
        if (templateJSON && templateJSON.Parameters) {
            Object.keys(templateJSON.Parameters).forEach(param => {
                Parameters[param] = templateJSON.Parameters[param].Default
            })
        }
        console.log(Parameters)

        this.setState({
            modal: 'execute',
            templateJSON,

            //set executeRow params
            executeRow: { ...rowData, cloudAccounts: ca, selectedAccounts: [], Parameters, },

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
        axiosCloudformation.post('/saveTemplate', {
            name, cf, description, approved, id
        }).then(data =>
            this.props.fetchTemplates()
                .then(data => this.setState({ openModal: false }))
        )
            .catch(e => console.log(e))
    }

    renderParamSelector(key, object) {
        const { executeRow } = this.state;
        console.log(key)
        return (<div>{
            object.AllowedValues ?
                <FormControl style={{ width: '100%' }}>
                    <InputLabel >{key}</InputLabel>
                    <Select
                        value={executeRow.Parameters[key]}
                        onChange={(e) => this.handleChange(key, e, 'Parameters')}
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
                    onChange={(e) => this.handleChange(key, e, 'Parameters')}
                    margin="normal"
                />}
            <Typography variant="subtitle1" id="simple-modal-description">
                Type: {object.Type}
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
                Description: {object.Description}
            </Typography></div>)
    }

    async onChangeTab(e, selectedLogTab) {
        const { logs } = this.state;
        const indexSelectedLogTab = logs.cloud_accounts.indexOf(selectedLogTab);

        if (logs.cloud_accounts_responses[indexSelectedLogTab].error) this.setState({ selectedLogTab });
        else {
            //LOADING
            this.setState({ logs: { ...this.state.logs, loading: true }, selectedLogTab })

            //FETCH
            const { stackName, date } = logs;
            this.props.fetchStackEvents({ stackName, cloud_account_id: selectedLogTab, date })
                .then(() => this.setState({
                    logs: { ...this.state.logs, loading: false },
                }))
        }
    }

    renderLogs() {
        const { logs, selectedLogTab, executeRow } = this.state;
        const { stackEvents } = this.props;

        return (
            <ExecutionLogsView
                logs={logs}
                selectedLogTab={selectedLogTab}
                executeRow={executeRow}
                stackEvents={stackEvents}
                fetchStackEvents={this.props.fetchStackEvents}
                onChangeTab={this.onChangeTab}
            />
        )
    }

    renderView() {
        const { viewRow, templateJSON } = this.state;
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
                            value={viewRow.name}
                            onChange={(e) => this.handleChange('name', e)}
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
                            rowsMax="4"
                            onChange={(e) => this.handleChange('description', e)}
                            margin="normal"
                        />
                    </Grid>

                    <FormControlLabel
                        control={
                            <Switch checked={this.state.viewRow.checked} onChange={(e) => this.handleChange('approved', e)} value="Approved" />
                        }
                        label="Approved"
                    />
                    <JSONInput
                        id='a_unique_id'
                        placeholder={templateJSON}
                        // colors={'darktheme'}
                        locale={locale}
                        height='250px'
                        onChange={(e) => this.handleChange('jsonFormatter', e)}

                    />
                    <Grid item xs={12}>
                        <Button onClick={(e) => this.deleteRow(viewRow)}>
                            Delete
                    </Button>
                        <Button
                            onClick={this.saveTemplate}
                            color="primary"
                            disabled={this.disableSaveBtn('view')}
                        >
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

    handleChangeChecked(value) {
        const { selectedAccounts } = this.state.executeRow;

        const currentIndex = selectedAccounts.indexOf(value);
        const newSelectedAccounts = [...selectedAccounts]

        if (currentIndex === -1) {
            newSelectedAccounts.push(value)
        } else {
            newSelectedAccounts.splice(currentIndex, 1);
        }

        this.setState({ executeRow: { ...this.state.executeRow, selectedAccounts: newSelectedAccounts } })
    }

    renderExecute() {
        const { executeRow, templateJSON } = this.state;
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
                            id="stackName"
                            label="StackName"
                            style={{ width: '100%' }}
                            // className={classes.textField}
                            value={executeRow.stackName}
                            onChange={(e) => this.handleChange('stackName', e)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CheckList items={executeRow.cloudAccounts.map(ca => ca.name)} handleToggle={this.handleChangeChecked} checked={executeRow.selectedAccounts} />
                    </Grid>


                    {templateJSON && templateJSON.Parameters && <Typography variant="h6" id="modal-title">
                        Parameters
                    </Typography>}
                    {templateJSON && templateJSON.Parameters && Object.keys(templateJSON.Parameters)
                        .map((key) => this.renderParamSelector(key, templateJSON.Parameters[key]))}

                    <Grid item xs={12}>
                        <Button
                            onClick={this.executeTemplate}
                            color="primary"
                        >
                            Execute
                        </Button>
                        <Button onClick={this.handleCloseModal}>
                            Cancel
                    </Button>
                    </Grid>
                </form>
            </Container>
        )
    }

    disableSaveBtn(modal) {
        const { name, jsonFormatter, description } = this.state[modal + 'Row'];
        return !(jsonFormatter.error === false || jsonFormatter.error === undefined) ||
            !name || name === '' || !description || description === '';
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
                            onChange={(e) => this.handleChange('name', e)}
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
                            onChange={(e) => this.handleChange('description', e)}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input label="jasd" type="file"
                            style={{ width: '100%' }}
                            onClick={e => console.log(e)}
                            accept="application/json"
                            onChange={this.fileChangedHandler}
                            inputRef={ref => this.inputFile = ref}
                        />
                    </Grid>
                    <FormControlLabel
                        control={
                            <Switch checked={this.state.newRow.approved} onChange={(e) => this.handleChange('approved', e)} value="Approved" />
                        }
                        label="Approved"
                    />
                    <JSONInput
                        id='a_unique_id'
                        placeholder={newRow.json}
                        // colors={'darktheme'}
                        locale={locale}
                        height='250px'
                        onChange={(e) => this.handleChange('jsonFormatter', e)}
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
        const { state } = this;
        const { openModal } = state;
        return (
            <div className='tabla-material'>
                <Paper style={{ padding: 8 }}>
                    <Breadcrumbs aria-label="Breadcrumb">
                        <Link color="inherit" href="/" onClick={() => { }}>
                            Template </Link>
                        <Link color="inherit" href="/getting-started/installation/" onClick={() => { }}>
                            List </Link>
                        {/* <Link
                            color="textPrimary"
                            href="/components/breadcrumbs/"
                            onClick={() => { }}
                            aria-current="page"
                        >
                            Breadcrumb</Link> */}
                    </Breadcrumbs>
                </Paper>
                {state.state === 'list' && <MaterialTable
                    title="Templates"
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
                />}
                {state.state === 'logs' && this.renderLogs()}
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
            fetchStackEvents: (payload) => dispatch(fetchStackEvents(payload)),
        }
    )
}

const mapStateToProps = function (state) {
    return {
        templates: state.templates.templates,
        stackEvents: state.templates.stackEvents,
        currentClient: state.clients.currentClient,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(cloudformationTemplates);