import { combineReducers } from 'redux';
import usersReducer from './users-reducer';
import templatesReducer from './templates-reducer';

export default combineReducers({
    users: usersReducer,
    templates: templatesReducer,
})