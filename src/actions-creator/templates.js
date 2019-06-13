import { axiosCloudformation } from '../config/axios';
import { RECEIVE_TEMPLATES } from '../constants/redux';

const receiveTemplate = (templates) => ({
    type: RECEIVE_TEMPLATES,
    templates
})

export const fetchTemplates = () => dispatch => {
    return axiosCloudformation.get(`/getTemplates`)
        .then(res => res.data)
        .then(templates => dispatch(receiveTemplate(templates)))
}
