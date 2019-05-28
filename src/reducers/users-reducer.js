import { RECEIVE_USER } from '../constants/redux';

const initialState = {
    currentUser: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_USER:
            return Object.assign({}, state, { currentUser: action.user });
        default:
            return state;
    }
}