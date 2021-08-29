import * as actionTypes from './actionTypes.js';
import axios from 'axios';
import Axios from '../../axios';
import { emailTest } from '../../utilities';

export const onSetUserInput = (field, value) => {
    return {
        type: actionTypes.SET_USER_INPUT,
        field,
        value
    }
}

export const onToggleShowPassword = () => {
    return {
        type: actionTypes.TOGGLE_SHOW_PASSWORD
    }
}

const onSetValidationMessage = (key, message) => {
    return {
        type: actionTypes.SET_VALIDATION_MESSAGE,
        key,
        message
    }
}

const onInitLogin = () => {
    return {
        type: actionTypes.INIT_LOGIN
    }
}

const onLoginSuccess = (token, userId, userEmail) => {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        token,
        userId,
        userEmail
    }
}

const onLoginFail = (error) => {
    return {
        type: actionTypes.LOGIN_FAIL,
        error
    }
}

export const onLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    localStorage.removeItem('userEmail')
    return {
        type: actionTypes.LOGOUT
    }
}

const checkLoginTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(onLogout())
        }, expirationTime * 1000)
    }
}

const onLogin = (url, email, password) => {

    const body = {
        email: email,
        password: password,
        returnSecureToken: true
    }

    return dispatch => {
        dispatch(onInitLogin())

        axios.post(url, body)
            .then(res => {
                const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
                localStorage.setItem('token', res.data.idToken);
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', res.data.localId);
                localStorage.setItem('userEmail', res.data.email);
                dispatch(onLoginSuccess(res.data.idToken, res.data.localId, res.data.email))
                dispatch(checkLoginTimeout(res.data.expiresIn))
            })
            .catch(error => {
                dispatch(onLoginFail(error))
            })
    }
}

const logInValidation = (email, password) => {
    return dispatch => {
        if (!email) {
            dispatch(onSetValidationMessage('email', '*Email ID is required'))
        }
        if (email && !emailTest(email)) {
            dispatch(onSetValidationMessage('email', '*Email ID must be of the format chars@chars.chars'))
        }
        if (!password) {
            dispatch(onSetValidationMessage('password', '*Password is required'))
        }
    }
}

export const onLogInSubmit = (url, userInputs) => {
    return dispatch => {
        if (userInputs.email.value && emailTest(userInputs.email.value) === true && userInputs.password.value) {
            dispatch(onLogin(url, userInputs.email.value, userInputs.password.value));
        }
        else {
            dispatch(logInValidation(userInputs.email.value, userInputs.password.value))
        }
    }
}

export const onAutoLogin = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if (!token)
            dispatch(onLogout())
        else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if (expirationDate <= new Date())
                dispatch(onLogout())
            else {
                const userId = localStorage.getItem('userId')
                const userEmail = localStorage.getItem('userEmail')
                dispatch(onLoginSuccess(token, userId, userEmail))
                dispatch(checkLoginTimeout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
}

const onInitGetProfile = () => {
    return {
        type: actionTypes.INIT_GET_PROFILE
    }
}

const onGetProfileSuccess = (email, picture, username) => {
    return {
        type: actionTypes.GET_PROFILE_SUCCESS,
        email,
        picture,
        username
    }
}

const onGetProfileFail = (error) => {
    return {
        type: actionTypes.GET_PROFILE_FAIL,
        error
    }
}

export const onGetProfile = (url, token) => {
    return dispatch => {
        dispatch(onInitGetProfile())

        const options = {
            params: {
                auth: token
            }
        }

        Axios.get(url, options)
            .then(res => {
                dispatch(onGetProfileSuccess(res.data.email, res.data.picture, res.data.username))
            })
            .catch(error => {
                dispatch(onGetProfileFail(error))
            })
    }
}