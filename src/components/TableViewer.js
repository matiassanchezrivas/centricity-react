import React from 'react'
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import Modal from './Modal'
import { axiosConfigurations } from '../config/axios'

class TableViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newRow: {},
            viewRow: {},
            modal: 'new',
        };

        this.onRowAdd = this.onRowAdd.bind(this);
        this.deleteRow = this.deleteRow.bind(this);
        this.updateRow = this.updateRow.bind(this);
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

export default connect(mapStateToProps, mapDispatchToProps)(TableViewer);