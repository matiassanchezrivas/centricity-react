import { axiosBack } from '../config/axios';
import { RECEIVE_USER } from '../constants/redux';

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const fetchUser = () => dispatch => {
    return axiosBack.get(`/user/me`)
        .then(res => res.data)
        .then(user => dispatch(receiveUser(user)))
}
