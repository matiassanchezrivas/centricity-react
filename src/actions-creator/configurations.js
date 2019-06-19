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

export const fetchTables = () => dispatch => {
    return axiosConfigurations.get(`/listTables`)
        .then(res => res.data)
        .then(tables => dispatch(receiveTable(tables)))
}

export const fetchItems = (selectedTable, keys) => dispatch => {
    return axiosConfigurations.post(`/scanTable`, { tableName: selectedTable, attributeNames: keys, conditions: [], pagination: { limit: 100 } })
        .then(res => res.data)
        .then(items => dispatch(receiveItems(items, selectedTable)))
}