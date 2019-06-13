import { RECEIVE_ALL_TABLES } from '../constants/redux';

const initialState = {
    all_tables: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_ALL_TABLES:
            return Object.assign({}, state, { all_tables: action.all_tables });
        default:
            return state;
    }
}