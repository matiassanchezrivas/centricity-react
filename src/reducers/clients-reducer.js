import { RECEIVE_CLIENTS, RECEIVE_CLIENT } from '../constants/redux';

const initialState = {
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_CLIENTS:
            return Object.assign({}, state, { clients: action.clients });
        case RECEIVE_CLIENT:
            return Object.assign({}, state, { currentClient: action.client });
        default:
            return state;
    }
}