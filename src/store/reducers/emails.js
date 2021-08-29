import * as actionTypes from '../actions/actionTypes';
import { sortEmailCards } from '../../utilities';

const initialState = {
    folders: {
        1: [],
        2: []
    },
    loading: false,
    error: null,
    url: '/emails.json',

    deleteEmails: {
        selected: [],
        loading: false,
        error: null,
        url: '/emails'
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INIT_GET_EMAILS:
            return {
                ...state,
                loading: true,
                error: null
            };
        case actionTypes.GET_EMAILS_SUCCESS:
            return {
                ...state,
                folders: {
                    1: action.emails.filter(email => email.folderId === 1).sort(sortEmailCards),
                    2: action.emails.filter(email => email.folderId === 2).sort(sortEmailCards)
                },
                loading: false,
                error: null
            };
        case actionTypes.GET_EMAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.UPDATE_SENT_EMAIL_LIST:
            return {
                ...state,
                folders: {
                    ...state.folders,
                    2: state.folders[2].reverse().concat(action.email).reverse()
                }
            };
        case actionTypes.SELECT_EMAIL:
            return {
                ...state,
                deleteEmails: {
                    ...state.deleteEmails,
                    selected: state.deleteEmails.selected.concat(action.id)
                }
            };
        case actionTypes.UNSELECT_EMAIL:
            return {
                ...state,
                deleteEmails: {
                    ...state.deleteEmails,
                    selected: state.deleteEmails.selected.filter(id => id !== action.id)
                }
            };
        case actionTypes.UNSELECT_ALL_EMAILS:
            return {
                ...state,
                deleteEmails: {
                    ...state.deleteEmails,
                    selected: []
                }
            };
        case actionTypes.INIT_DELETE_EMAIL:
            return {
                ...state,
                deleteEmails: {
                    ...state.deleteEmails,
                    loading: true,
                    error: null
                }
            };
        case actionTypes.DELETE_EMAIL_SUCCESS:
            return {
                ...state,
                deleteEmails: {
                    ...state.deleteEmails,
                    selected: state.deleteEmails.selected.filter(id => id !== action.id),
                    loading: false,
                    error: null
                },
                folders: {
                    1: state.folders[1].filter(email => email.id !== action.id).sort(sortEmailCards),
                    2: state.folders[2].filter(email => email.id !== action.id).sort(sortEmailCards)
                }
            };
        case actionTypes.DELETE_EMAIL_FAIL:
            return {
                ...state,
                deleteEmails: {
                    ...state.deleteEmails,
                    loading: false,
                    error: action.error
                }
            };
        default:
            return state;
    }
}

export default reducer;