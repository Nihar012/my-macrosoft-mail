import * as actionTypes from '../actions/actionTypes';
import { EditorState } from 'draft-js';

const initialState = {
    userInputs: {
        title: '',
        body: EditorState.createEmpty(),
        subject: '',
        to: ''
    },
    loading: false,
    error: null,
    url: '/emails.json'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.RESET_COMPOSE_EMAIL_USER_INPUTS:
            return {
                ...state,
                userInputs: {
                    title: '',
                    body: EditorState.createEmpty(),
                    subject: '',
                    to: ''
                }
            };
        case actionTypes.CHANGE_COMPOSE_EMAIL_USER_INPUT:
            return {
                ...state,
                userInputs: {
                    ...state.userInputs,
                    [action.field]: action.value
                }
            };
        case actionTypes.INIT_SEND_EMAIL:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.SEND_EMAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            };
        case actionTypes.SEND_EMAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
}

export default reducer;