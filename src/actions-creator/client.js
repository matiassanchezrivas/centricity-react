import { axiosBack } from '../config/axios';
import { RECEIVE_CLIENTS, RECEIVE_CLIENT } from '../constants/redux';

const receiveClients = (clients) => ({
    type: RECEIVE_CLIENTS,
    clients
})

const receiveClient = (client) => {
    let session = localStorage.getItem('cloudpoxee.session')
    let parsedSession = JSON.parse(session);
    parsedSession.user.customer = client;
    localStorage.setItem('cloudpoxee.session', JSON.stringify(parsedSession));
    return {
        type: RECEIVE_CLIENT,
        client
    }
}

export const fetchClients = () => dispatch => {
    return axiosBack.get(`/customer/all`)
        .then(res => res.data)
        .then(clients => dispatch(receiveClients(clients)))
}

export const fetchClient = (client) => dispatch => {
    console.log('fetchClient', client)
    return dispatch(receiveClient(client))
}
