import * as actionTypes from './actionTypes';
import Axios from '../../axios';

export const onChangeComposeEmailUserInput = (field, value) => {
    return {
        type: actionTypes.CHANGE_COMPOSE_EMAIL_USER_INPUT,
        field,
        value
    }
}

export const onResetComposeEmailUserInputs = () => {
    return {
        type: actionTypes.RESET_COMPOSE_EMAIL_USER_INPUTS
    }
}

const onInitSendEmail = () => {
    return {
        type: actionTypes.INIT_SEND_EMAIL
    }
}

const onSendEmailSuccess = () => {
    return {
        type: actionTypes.SEND_EMAIL_SUCCESS
    }
}

const onSendEmailFail = (error) => {
    return {
        type: actionTypes.SEND_EMAIL_FAIL,
        error
    }
}

const onUpdateSentEmailList = (email) => {
    return {
        type: actionTypes.UPDATE_SENT_EMAIL_LIST,
        email
    }
}

const onGetComposedEmailDetails = (options, id) => {
    return dispatch => {
        Axios.get(`/emails/${id}.json`, options)
            .then(res => {
                dispatch(onUpdateSentEmailList({
                    id: id,
                    ...res.data
                }))
            })
            .catch(error => {

            })
    }
}

export const onSendEmail = (url, token, data) => {
    return dispatch => {
        dispatch(onInitSendEmail())

        const options = {
            params: {
                auth: token
            }
        }

        Axios.post(url, data, options)
            .then(res => {
                dispatch(onSendEmailSuccess())
                dispatch(onGetComposedEmailDetails(options, res.data.name))
            })
            .catch(error => {
                dispatch(onSendEmailFail(error))
            })
    }
}