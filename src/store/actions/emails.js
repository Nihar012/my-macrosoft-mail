import * as actionTypes from './actionTypes.js';
import Axios from '../../axios';

const onInitGetEmails = () => {
    return {
        type: actionTypes.INIT_GET_EMAILS
    }
}

const onGetEmailsSuccess = (emails) => {
    return {
        type: actionTypes.GET_EMAILS_SUCCESS,
        emails
    }
}

const onGetEmailsFail = (error) => {
    return {
        type: actionTypes.GET_EMAILS_FAIL,
        error
    }
}

export const onGetEmails = (url, token) => {
    return dispatch => {
        dispatch(onInitGetEmails())

        const options = {
            params: {
                auth: token
            }
        }

        Axios.get(url, options)
            .then(res => {
                let emails = []
                for(let key in res.data){
                    emails.push({
                        id: key,
                        ...res.data[key]
                    })
                }
                dispatch(onGetEmailsSuccess(emails))
            })
            .catch(error => {
                dispatch(onGetEmailsFail(error))
            })
    }
}

export const onSelectEmail = (id) => {
    return {
        type: actionTypes.SELECT_EMAIL,
        id
    }
}

export const onUnSelectEmail = (id) => {
    return {
        type: actionTypes.UNSELECT_EMAIL,
        id
    }
}

export const onUnSelectAllEmails = () => {
    return {
        type: actionTypes.UNSELECT_ALL_EMAILS
    }
}

const onInitDeleteEmail = () => {
    return {
        type: actionTypes.INIT_DELETE_EMAIL
    }
}

const onDeleteEmailSuccess = (id) => {
    return {
        type: actionTypes.DELETE_EMAIL_SUCCESS,
        id
    }
}

const onDeleteEmailFail = (error) => {
    return {
        type: actionTypes.DELETE_EMAIL_SUCCESS,
        error
    }
}

export const onDeleteEmails = (url, token, ids, resetIsSelecting) => {
    return dispatch => {

        const options = {
            params: {
                auth: token
            }
        }

        for(let id of ids){
            dispatch(onInitDeleteEmail())

            Axios.delete(`${url}/${id}.json`, options)
            .then(res => {
                dispatch(onDeleteEmailSuccess(id))
                resetIsSelecting()
            })
            .catch(error => {
                dispatch(onDeleteEmailFail(error))
            })
        }
        
    }
}