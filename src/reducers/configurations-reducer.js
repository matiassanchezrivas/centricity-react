import { RECEIVE_ALL_TABLES, RECEIVE_ITEMS, RECEIVE_ALL_PERSISTED_TABLES } from '../constants/redux';

const initialState = {
    all_tables: [],
    all_persisted_tables: [],
    items: [],
    selectedTable: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_ALL_TABLES:
            return Object.assign({}, state, { all_tables: action.all_tables });
        case RECEIVE_ALL_PERSISTED_TABLES:
            return Object.assign({}, state, { all_persisted_tables: action.all_persisted_tables });
        case RECEIVE_ITEMS:
            return Object.assign({}, state, { selectedTable: action.selectedTable, items: action.items });
        default:
            return state;
    }
}