import { RECEIVE_LANGUAJE } from '../constants/redux';

const initialState = {
    currentLanguaje: 'en'
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_LANGUAJE:
            return Object.assign({}, state, { currentLanguaje: action.languaje });
        default:
            return state;
    }
}