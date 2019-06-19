import { RECEIVE_LANGUAJE } from '../constants/redux';

const receiveLanguaje = (languaje) => ({
    type: RECEIVE_LANGUAJE,
    languaje
})

export const changeLanguaje = (languaje) => dispatch => {
    return dispatch(receiveLanguaje(languaje))
}
