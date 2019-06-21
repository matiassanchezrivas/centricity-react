import { axiosCloudformation } from '../config/axios';
import { RECEIVE_TEMPLATES, RECEIVE_STACK_EVENTS } from '../constants/redux';

const receiveTemplate = (templates) => ({
    type: RECEIVE_TEMPLATES,
    templates
})

const receiveStackEvents = (stackEvents) => ({
    type: RECEIVE_STACK_EVENTS,
    stackEvents
})

export const fetchTemplates = () => dispatch => {
    return axiosCloudformation.get(`/getTemplates`)
        .then(res => res.data)
        .then(templates => dispatch(receiveTemplate(templates)))
}

export const fetchStackEvents = (payload) => dispatch => {
    const { stackName, cloud_account_id } = payload;
    return axiosCloudformation.post(`/describeStackEvents`, { stackName, cloud_account_id })
        .then(res => res.data)
        .then(stackEvents => dispatch(receiveStackEvents(stackEvents)))
}