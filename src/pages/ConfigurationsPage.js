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

class Layout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            openModal: false,
            links: [],
            loading: true,
            keys: ["id", "composite", "firstName", "fullName", "lastName", "phoneNumber"]
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target;
        const { keys } = this.state;
        this.setState({ [name]: value })
        if (name === 'selectedTable') {
            this.props.fetchItems(value, keys);
        }
    }

    componentDidMount() {
        this.props.fetchTables();
    }

    handleCloseModal() {
        this.setState({ openModal: false })
    }

    render() {
        const { selectedTable, openModal, keys } = this.state;
        const { all_tables, items, fetchItems } = this.props;
        console.log(items)
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
                            <InputLabel >Select a table</InputLabel>
                            <Select
                                name={'selectedTable'}
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
                            keys={keys}
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
        items: state.configurations.items
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);