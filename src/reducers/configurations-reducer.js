import { RECEIVE_ALL_TABLES, RECEIVE_ITEMS } from '../constants/redux';

const initialState = {
    all_tables: [],
    items: [],
    selectedTable: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_ALL_TABLES:
            return Object.assign({}, state, { all_tables: action.all_tables });
        case RECEIVE_ITEMS:
            return Object.assign({}, state, { selectedTable: action.selectedTable, items: action.items });
        default:
            return state;
    }
}