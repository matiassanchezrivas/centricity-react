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
        const { keys, currentClient, selectedAccount } = this.props;

        return axiosConfigurations.post('/deleteItem', { customer_id: currentClient ? currentClient.id : null, cloud_account_id: selectedAccount, id: rowData.id, tableName })
            .then(data => this.props.fetchItems(currentClient ? currentClient.id : null, selectedAccount, tableName, keys))
            .catch(e => { alert('Delete error, please try again'); return 'error' })
    }

    updateRow(newData, oldData, tableName) {
        const { currentClient, selectedAccount, keys } = this.props;
        newData.id = oldData.id;

        return axiosConfigurations.put('/putItem', { customer_id: currentClient ? currentClient.id : null, cloud_account_id: selectedAccount, item: newData, tableName })
            .then(data => this.props.fetchItems(currentClient ? currentClient.id : null, selectedAccount, tableName, keys))
            .catch(e => { alert('Delete error, please try again'); return 'error' })
    }

    onRowAdd(newData, tableName) {
        const { currentClient, selectedAccount, keys } = this.props;
        console.log(newData, tableName)
        newData.id = parseInt(newData.id)
        return axiosConfigurations.put('/putItem', { customer_id: currentClient ? currentClient.id : null, cloud_account_id: selectedAccount, item: newData, tableName })
            .then(data => this.props.fetchItems(currentClient ? currentClient.id : null, selectedAccount, tableName, keys))
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
        const { selectedTable, keys, data, columns } = this.props;
        return (
            selectedTable ? <div className='tabla-material'>
                <MaterialTable
                    title={selectedTable}
                    columns={columns}
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