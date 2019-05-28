import axios from '../config/axios';
import { RECEIVE_USER } from '../constants/redux';

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const fetchUser = (token) => dispatch => {
    return axios.get(`/user/me`, { headers: { ['x-auth-sid']: token } })
        .then(res => res.data)
        .then(user => dispatch(receiveUser(user)))
}
