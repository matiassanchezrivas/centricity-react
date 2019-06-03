import { RECEIVE_TEMPLATES } from '../constants/redux';

const initialState = {
    templates: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_TEMPLATES:
            return Object.assign({}, state, { templates: action.templates });
        default:
            return state;
    }
}