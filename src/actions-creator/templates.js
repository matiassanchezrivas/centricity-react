import axios from '../config/axiosCloudfront';
import { RECEIVE_TEMPLATES } from '../constants/redux';

const receiveTemplate = (templates) => ({
    type: RECEIVE_TEMPLATES,
    templates
})

export const fetchTemplates = () => dispatch => {
    return axios.get(`/getTemplates`)
        .then(res => res.data)
        .then(templates => dispatch(receiveTemplate(templates)))
}
