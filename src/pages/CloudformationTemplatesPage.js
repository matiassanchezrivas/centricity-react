import React from 'react'
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { fetchTemplates, fetchStackEvents } from '../actions-creator/templates'
import { Tab, Tabs, AppBar } from '@material-ui/core';
import Modal from '../components/Modal'
import { axiosCloudformation } from '../config/axios'
import ExecutionLogsView from '../components/cloudformation/ExecutionLogsView'
import ExecutionList from '../components/cloudformation/ExecutionListView'
import RenderExecute from '../components/cloudformation/RenderExecute'
import RenderView from '../components/cloudformation/RenderView'
import RenderNew from '../components/cloudformation/RenderNew'

class cloudformationTemplates extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            state: "list",
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
            selectedTab: 'templates'

        };

        this.onChangeTab = this.onChangeTab.bind(this);
        this.changeState = this.changeState.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clickViewRow = this.clickViewRow.bind(this);
        this.disableSaveBtn = this.disableSaveBtn.bind(this);
        this.executeTemplate = this.executeTemplate.bind(this);
        this.clickAddTemplate = this.clickAddTemplate.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
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
        const { currentClient } = this.props;
        const { id, template_id, cloudAccounts, Parameters, stackname, selectedAccounts } = this.state.executeRow;
        const cloud_accounts = selectedAccounts.map(acname => {
            let ac = cloudAccounts.find(ca => ca.name === acname)
            return ac ? ac.id : null;
        }).filter(el => !!el)
        const date = (new Date()).getTime();
        axiosCloudformation.post('/executeTemplate', { template_id: id || template_id, cloud_accounts, Parameters, stackname, customer_id: 19 }) //HARCODED
            .then(response => response.data)
            .then(data => {
                console.log('data', data);
                this.props.fetchStackEvents({ stackname, cloud_account_id: cloud_accounts[0], date })
                    .then(() => {
                        this.setState({
                            selectedTab: 'executions',
                            openModal: false,
                            logs: {
                                stackname,
                                cloud_accounts,
                                cloud_accounts_responses: data.response,
                                date
                            },
                            state: 'logs',
                            selectedLogTab: cloud_accounts[0],
                        })
                    })
            })
            .catch(e => { console.log(e) })
    }

    changeState(state) {
        this.setState({ state })
    }

    modalSwitch() {
        const { executeRow, templateJSON, viewRow } = this.state;
        switch (this.state.modal) {
            case 'view':
                return <RenderView
                    viewRow={viewRow}
                    templateJSON={templateJSON}
                    handleChange={this.handleChange}
                    handleCloseModal={this.handleCloseModal}
                    deleteRow={this.deleteRow}
                    disableSaveBtn={this.disableSaveBtn}
                />
            case 'new':
                return <RenderNew
                    handleCloseModal={this.handleCloseModal}
                    fetchTemplates={this.props.fetchTemplates}
                />
            case 'execute':
                return <RenderExecute
                    executeRow={executeRow}
                    templateJSON={templateJSON}
                    handleChange={this.handleChange}
                    handleChangeChecked={this.handleChangeChecked}
                    handleCloseModal={this.handleCloseModal}
                    saveTemplate={this.saveTemplate}
                />
            default:
                return this.renderView();
        }
    }

    handleChange(field, e, param) {
        console.log(field, e.target, e.value, param)
        if (!param) {
            this.setState({
                [this.state.modal + 'Row']: { ...this.state[this.state.modal + 'Row'], [field]: e.target ? e.target.value : e }
            })
        } else {
            this.setState({
                executeRow: { ...this.state.executeRow, Parameters: { ...this.state.executeRow.Parameters, [field]: e.target.value } }
            })
        }
    }

    async clickViewRow(event, rowData) {
        console.log(rowData)
        const templateJSON = await axiosCloudformation.post('/getTemplateFromS3', { id: rowData.id || rowData.template_id })
            .then(response => response.data)
            .catch(e => { })
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
        const ca = await axiosCloudformation.post('/getCloudAccounts', { customer_id: 19 }) //HARDCODED
            .then(response => response.data)
            .catch(e => { })
        //Get template from s3
        const templateJSON = await axiosCloudformation.post('/getTemplateFromS3', { id: rowData.id || rowData.template_id })
            .then(response => response.data)
            .catch(e => { })

        let Parameters = {}
        if (templateJSON && templateJSON.Parameters) {
            Object.keys(templateJSON.Parameters).forEach(param => {
                Parameters[param] = templateJSON.Parameters[param].Default
                if (rowData.parameters) {
                    const params = JSON.parse(rowData.parameters);
                    Parameters[param] = (params[param]) ? params[param] : Parameters[param]
                }
            })
        }


        this.setState({
            modal: 'execute',
            templateJSON,

            //set executeRow params
            executeRow: { ...rowData, cloudAccounts: ca, selectedAccounts: [], Parameters },

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

    async onChangeTab(e, selectedLogTab) {
        const { logs } = this.state;
        const indexSelectedLogTab = logs.cloud_accounts.indexOf(selectedLogTab);

        if (logs.cloud_accounts_responses[indexSelectedLogTab].error) this.setState({ selectedLogTab });
        else {
            //LOADING
            this.setState({ logs: { ...this.state.logs, loading: true }, selectedLogTab })

            //FETCH
            const { stackname, date } = logs;
            this.props.fetchStackEvents({ stackname, cloud_account_id: selectedLogTab, date })
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



    disableSaveBtn(modal) {
        const { name, jsonFormatter, description } = this.state[modal + 'Row'];
        return !(jsonFormatter.error === false || jsonFormatter.error === undefined) ||
            !name || name === '' || !description || description === '';
    }



    render() {
        const { state, onChangeTab } = this;
        const { openModal, selectedTab, logs, executeRow, selectedLogTab } = state;

        const { currentClient, fetchStackEvents, stackEvents } = this.props;
        return (
            <div className='tabla-material'>
                {/* Tabs */}
                <AppBar position="static" color="default">
                    <Tabs
                        value={selectedTab}
                        onChange={(e, value) => this.setState({ selectedTab: value })}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        <Tab value={"templates"} label={"templates"} />
                        <Tab value={"executions"} label={"executions"} />
                    </Tabs>
                </AppBar>
                {/* Table */}
                {selectedTab === 'templates' && <MaterialTable
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
                {/* Executions */}
                {selectedTab === 'executions' &&
                    <ExecutionList
                        stackEvents={stackEvents}
                        fetchStackEvents={fetchStackEvents}
                        clickViewRow={this.clickViewRow}
                        currentClient={currentClient}
                        clickExecuteTemplate={this.clickExecuteTemplate}
                        state={this.state.state}
                        changeState={this.changeState}
                        fromTemplates={{
                            logs,
                            executeRow,
                            selectedLogTab,
                            onChangeTab
                        }}
                    />}
                {/* Modal */}
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