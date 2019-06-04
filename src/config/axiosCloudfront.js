import axios from 'axios'
// import { readCookie } from './helpers'
// import store from '../store';
import config from './config'

let IdToken = () => {
    try {
        let session = localStorage.getItem('cloudpoxee.session')
        const parsedSession = JSON.parse(session);
        if (parsedSession) {
            const { sessionId } = parsedSession;
            if (sessionId) return sessionId
            throw 'missing session'
        } else {
            throw 'missing session'
        }
    } catch (e) {
        return ''
    }
}

const instance = axios.create({
    baseURL: config.CENTRICITY_CLOUDFRONT,
    timeout: 30000,
    headers: {
        ['x-auth-sid']: IdToken(),
    }
});

// instance.interceptors.request.use(
//     config => {
//         config.headers.authorization = IdToken();
//         return config;
//     },
//     error => {
//         Promise.reject(error)}
// );


// instance.interceptors.response.use(function (response) {
//     return response;

// }, function (error) {
//     if (error.response && error.response.status === 401) {
//         store.dispatch({
//             type: 'LOG_USER',
//             user: {}
//         })
//     }
//     return Promise.reject(error);
// });

export default instance;