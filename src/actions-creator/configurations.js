import { axiosConfigurations } from '../config/axios';
import { RECEIVE_ALL_TABLES } from '../constants/redux';

const receiveTemplate = (all_tables) => ({
    type: RECEIVE_ALL_TABLES,
    all_tables
})

export const fetchTables = () => dispatch => {
    return axiosConfigurations.get(`/listTables`)
        .then(res => res.data)
        .then(tables => dispatch(receiveTemplate(tables)))
}
