import { axiosConfigurations } from '../config/axios';
import { RECEIVE_ALL_TABLES, RECEIVE_ITEMS } from '../constants/redux';

const receiveTable = (all_tables) => ({
    type: RECEIVE_ALL_TABLES,
    all_tables
})

const receiveItems = (items, selectedTable) => ({
    type: RECEIVE_ITEMS,
    items,
    selectedTable,

})

export const fetchTables = (customer_id, cloud_account_id) => dispatch => {
    return axiosConfigurations.post(`/listTables`, { customer_id, cloud_account_id })
        .then(res => res.data)
        .then(tables => dispatch(receiveTable(tables)))
}

export const fetchItems = (customer_id, cloud_account_id, selectedTable, keys) => dispatch => {
    if (!selectedTable) return dispatch(receiveItems([], ''))
    return axiosConfigurations.post(`/scanTable`, { customer_id, cloud_account_id, tableName: selectedTable, attributeNames: keys, conditions: [], pagination: { limit: 100 } })
        .then(res => res.data)
        .then(items => dispatch(receiveItems(items, selectedTable)))
}