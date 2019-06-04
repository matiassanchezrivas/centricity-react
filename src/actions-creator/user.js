import axios from '../config/axiosBack';
import { RECEIVE_USER } from '../constants/redux';

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const fetchUser = () => dispatch => {
    return axios.get(`/user/me`)
        .then(res => res.data)
        .then(user => dispatch(receiveUser(user)))
}
