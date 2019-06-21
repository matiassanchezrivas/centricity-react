import { RECEIVE_TEMPLATES, RECEIVE_STACK_EVENTS } from '../constants/redux';

const initialState = {
    templates: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_TEMPLATES:
            return Object.assign({}, state, { templates: action.templates });
        case RECEIVE_STACK_EVENTS: 
            return Object.assign({}, state, { stackEvents: action.stackEvents });
        default:
            return state;
    }
}