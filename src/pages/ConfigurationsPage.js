import React, { Component } from 'react'
import queryString from 'query-string';
import { fetchUser } from '../actions-creator/user'
import { connect } from 'react-redux';
import TableViewer from '../components/TableViewer'
import { fetchTables, fetchItems } from '../actions-creator/configurations'
import { FormControl, InputLabel, Select, MenuItem, Container, TextField, Button, Typography, Grid, FormControlLabel, Switch, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '../components/Modal'
import DynamoConfiguration from '../components/DynamoModal'
import { axiosCloudformation, axiosConfigurations } from '../config/axios'

class Layout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            links: [],
            loading: true,
            cloudAccounts: [],
            keys: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    async handleChange(e) {
        const { currentClient } = this.props;
        const { name, value } = e.target;
        const { selectedAccount } = this.state;
        this.setState({ [name]: value })
        if (name === 'selectedTable') {
            console.log(this.state)
            const tableConfig = await axiosConfigurations.post('/getDynamoTableKeys', { customer_id: currentClient.id, cloud_account_id: selectedAccount, tableName: value })
                .then(response => response.data)
                .catch(e => { })


            let keys = tableConfig ? JSON.parse(tableConfig.keys) : []
            this.props.fetchItems(value, keys.map(key => key.name));
            this.setState({ keys })

        }
    }

    async componentDidMount() {
        this.props.fetchTables();
        const ca = await axiosCloudformation.post('/getCloudAccounts', { customer_id: 19 }) //TODO replace customer_id
            .then(response => response.data)
            .catch(e => { })

        this.setState({
            cloudAccounts: ca,
        })
    }

    handleCloseModal() {
        this.setState({ openModal: false })
    }

    render() {
        const { selectedTable, openModal, keys, cloudAccounts, selectedAccount } = this.state;
        const { all_tables, items, fetchItems } = this.props;
        console.log(keys)
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
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel >Select a table</InputLabel>
                            <Select
                                name='selectedTable'
                                value={selectedTable}
                                onChange={(e) => this.handleChange(e)}
                            >
                                {all_tables.map((option, i) => <MenuItem key={i} value={option}>{option}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TableViewer
                            fetchItems={fetchItems}
                            selectedTable={selectedTable}
                            keys={keys.map(key => key.name)}
                            columns={keys.map(key => {
                                return { title: key.name, field: key.name, type: key.type == 'N' ? 'numeric' : 'string' }
                            })}
                            data={items ? items.Items : []}
                        />
                    </Grid>
                </Grid>
                <Modal
                    open={openModal}
                    handleClose={this.handleCloseModal}
                    data={this.transformDynamo}
                >
                    <DynamoConfiguration
                        tables={all_tables}
                    />
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return (
        {
            fetchTables: () => dispatch(fetchTables()),
            fetchItems: (tableName, attributeNames) => dispatch(fetchItems(tableName, attributeNames)),
        }
    )
}

const mapStateToProps = function (state) {
    return {
        all_tables: state.configurations.all_tables,
        items: state.configurations.items,
        currentClient: state.clients.currentClient
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);