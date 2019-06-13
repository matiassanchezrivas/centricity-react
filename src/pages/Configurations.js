import React, { Component } from 'react'
import queryString from 'query-string';
import { fetchUser } from '../actions-creator/user'
import { connect } from 'react-redux';
import TableViewer from '../components/TableViewer'
import { fetchTables, fetchItems } from '../actions-creator/configurations'
import { FormControl, InputLabel, Select, MenuItem, Container, TextField, Button, Typography, Grid, FormControlLabel, Switch, Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

class Layout extends Component {
    constructor(props) {
        super(props)

        this.state = {
            links: [],
            loading: true
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value })
        if (name === 'selectedTable') {
            const v = value.split('CENCONFIG_')[1]
            this.props.fetchItems(v);
        }
    }

    componentDidMount() {
        this.props.fetchTables();
    }

    render() {
        const { selectedTable } = this.state;
        const { all_tables } = this.props;
        return (
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
                        Centricity configurations
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
                        selectedTable={selectedTable}
                    />
                </Grid>
            </Grid>
        )
    }
}

const mapDispatchToProps = function (dispatch) {
    return (
        {
            fetchTables: () => dispatch(fetchTables()),
            fetchItems: (tableName) => dispatch(fetchItems(tableName)),
        }
    )
}

const mapStateToProps = function (state) {
    return {
        all_tables: state.configurations.all_tables
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);