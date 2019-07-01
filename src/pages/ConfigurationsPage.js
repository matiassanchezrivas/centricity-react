import React, { Component } from 'react'
import { connect } from 'react-redux';
import { fetchTables, fetchItems, fetchPersistedTables } from '../actions-creator/configurations'
import { FormControl, InputLabel, Select, MenuItem, Typography, Grid, Paper, Tabs, Tab } from '@material-ui/core';
import { axiosCloudformation, axiosConfigurations } from '../config/axios'

import CreateTable from '../components/configurations/CreateTable'
import ViewItems from '../components/configurations/ViewItems'
import SelectTables from '../components/configurations/SelectTables'

class ConfigurationsPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tab: 'select',
            newTable: {
                keys: [{ name: 'id', type: 'Number', primaryKey: true }]
            },
            openModal: false,
            links: [],
            loading: true,
            cloudAccounts: [],
            keys: []
        }
        this.addKey = this.addKey.bind(this);
        this.deleteKey = this.deleteKey.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTab = this.handleChangeTab.bind(this)
        this.createTableClick = this.createTableClick.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.confirmCreateTable = this.confirmCreateTable.bind(this);
        this.handleChangeInside = this.handleChangeInside.bind(this);
    }

    async handleChange(e) {
        const { currentClient } = this.props;
        const { name, value } = e.target;
        const { selectedAccount } = this.state;
        this.setState({ [name]: value })
        if (name === 'selectedTable') {
            const tableConfig = await axiosConfigurations.post('/getDynamoTableKeys', { customer_id: currentClient.id, cloud_account_id: selectedAccount, tableName: value })
                .then(response => response.data)
                .catch(e => { })
            let keys = tableConfig ? JSON.parse(tableConfig.keys) : []
            this.props.fetchItems(currentClient ? currentClient.id : null, selectedAccount, value, keys.map(k => k.name));
            this.setState({ keys })
        } else if (name === 'selectedAccount') {
            this.props.fetchTables(currentClient ? currentClient.id : null, value);
            this.props.fetchPersistedTables(currentClient ? currentClient.id : null, value);
        }
    }

    handleChangeInside(e, obj, type, i) {
        const { name, value } = e.target;
        console.log(obj, type, i, name, value)
        if (!type) {
            this.setState({
                [obj]: { ...this.state[obj], [e.target.name]: e.target.value }
            })
        } else {
            console.log(obj, type, i)
            this.setState({
                [obj]: { ...this.state[obj], keys: this.state[obj].keys.map((k, index) => (i === index) ? { ...k, [name]: value } : k) }
            })
        }
        console.log(this.state)
    }

    async componentDidMount() {
        const { currentClient } = this.props;
        const ca = await axiosCloudformation.post('/getCloudAccounts', { customer_id: currentClient.id })
            .then(response => response.data)
            .catch(e => { })

        this.setState({
            cloudAccounts: ca,
        })
    }

    handleCloseModal() {
        this.setState({ openModal: false })
    }

    addKey() {
        this.setState({
            newTable: { ...this.state.newTable, keys: [...this.state.newTable.keys, { name: '', type: 'String' }] }
        })
    }

    deleteKey(i) {
        let keysRemaining = this.state.newTable.keys;
        keysRemaining.splice(i, 1);
        this.setState({
            newTable: { ...this.state.newTable, keys: keysRemaining }
        })
    }

    createTableClick() {
        console.log('clicks')
        this.setState({
            openModal: true,
            modal: 'createTable'
        })
    }

    confirmCreateTable() {
        const { selectedAccount, newTable } = this.state;
        const { currentClient } = this.props;
        let { keys } = newTable;

        keys.map(k => {
            if (k.type === 'Number') k.type = 'N'
            else if (k.type === 'Binary') k.type = 'B'
            else k.type = 'S'
            return k
        })

        axiosConfigurations.post('/createTable', {
            customer_id: currentClient ? currentClient.id : null,
            cloud_account_id: selectedAccount,
            tableName: newTable.name,
            keys: JSON.stringify(keys)
        })

    }


    handleChangeTab(event, tab) {
        this.setState({ tab });
    }


    render() {
        const { selectedTable, openModal, keys, cloudAccounts, selectedAccount, tab } = this.state;
        const { all_tables, all_persisted_tables, items, fetchItems, currentClient } = this.props;
        return (
            <div>
                <Grid
                    spacing={3}
                    container
                    direction="column"
                    justify="center"
                    alignItems="stretch"
                    style={{
                        flexGrow: 1, paddingLeft: 25, paddingRight: 25
                    }}
                >
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            Configurations
                </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel >Select a Cloud Account</InputLabel>
                            <Select
                                name='selectedAccount'
                                value={selectedAccount}
                                onChange={(e) => this.handleChange(e)}
                            >
                                {cloudAccounts.map((option, i) => <MenuItem key={i} value={option.id}>{option.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {selectedAccount && <div><Paper position="static">
                            <Tabs value={tab} onChange={this.handleChangeTab} indicatorColor="primary"
                                textColor="primary"
                                centered>
                                <Tab value={"select"} label="Select / edit tables" wrapped />
                                <Tab value={"create"} label="Create new table" />
                                <Tab value={"view"} label="View items" />
                            </Tabs>
                        </Paper>
                            {tab === 'select' && <SelectTables fetchPersistedTables={this.props.fetchPersistedTables} all_tables={all_tables} all_persisted_tables={all_persisted_tables} cloud_account_id={selectedAccount} customer_id={currentClient.id} />}

                            {tab === 'create' && <CreateTable newTable={this.state.newTable} addKey={this.addKey} deleteKey={this.deleteKey} handleChangeInside={this.handleChangeInside} confirmCreateTable={this.confirmCreateTable} />}

                            {tab === 'view' && <ViewItems selectedTable={selectedTable} all_persisted_tables={all_persisted_tables} fetchItems={fetchItems} keys={keys} items={items} selectedAccount={selectedAccount} currentClient={currentClient} handleChange={this.handleChange} />}
                        </div>}
                    </Grid>

                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return (
        {
            fetchTables: (customer_id, cloud_account_id) => dispatch(fetchTables(customer_id, cloud_account_id)),
            fetchItems: (customer_id, cloud_account_id, tableName, attributeNames) => dispatch(fetchItems(customer_id, cloud_account_id, tableName, attributeNames)),
            fetchPersistedTables: (customer_id, cloud_account_id) => dispatch(fetchPersistedTables(customer_id, cloud_account_id)),
        }
    )
}

const mapStateToProps = function (state) {
    return {
        all_tables: state.configurations.all_tables,
        all_persisted_tables: state.configurations.all_persisted_tables,
        items: state.configurations.items,
        currentClient: state.clients.currentClient
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfigurationsPage);