import React, { Component } from 'react'
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { fetchTemplates } from '../actions-creator/templates'


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
        };
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

    render() {
        const { state, setState } = this;
        return (
            <div className='tabla-material'>
                <MaterialTable
                    title="Centricity Templates"
                    columns={state.columns}
                    data={state.data}
                    editable={{
                        onRowAdd: newData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...state.data];
                                    data.push(newData);
                                    setState({ ...state, data });
                                }, 600);
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...state.data];
                                    data[data.indexOf(oldData)] = newData;
                                    setState({ ...state, data });
                                }, 600);
                            }),
                        onRowDelete: oldData =>
                            new Promise(resolve => {
                                setTimeout(() => {
                                    resolve();
                                    const data = [...state.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    setState({ ...state, data });
                                }, 600);
                            }),
                    }}
                /></div>
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