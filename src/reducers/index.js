import { combineReducers } from 'redux';
import usersReducer from './users-reducer';
import templatesReducer from './templates-reducer';
import clientsReducer from './clients-reducer';
import configurationsReducer from './configurations-reducer';

export default combineReducers({
    users: usersReducer,
    templates: templatesReducer,
    clients: clientsReducer,
    configurations: configurationsReducer,
})