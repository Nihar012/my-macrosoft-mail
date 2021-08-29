import * as actionTypes from '../actions/actionTypes';

const initialState = {
    elements: {
        email: {
            elementConfig: {
                type: 'text',
                placeholder: 'Email'
            },
            message: '',
        },
        password: {
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            message: '',
            show: false
        }
    },
    userInputs: {
        email: {
            value: '',
            defaultValue: null
        },
        password: {
            value: '',
            defaultValue: null
        }
    },
    token: null,
    profile: {
        email: null,
        picture: null,
        username: null,
        loading: false,
        error: null,
        url: '/profile.json'
    },
    loading: false,
    error: null,
    url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRe3MBlMSG2-EvstlxRbpnSdnTgebJ1ko'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER_INPUT:
            return {
                ...state,
                ...state,
                elements: {
                    ...state.elements,
                    [action.field]: {
                        ...state.elements[action.field],
                        message: ''
                    }
                },
                userInputs: {
                    ...state.userInputs,
                    [action.field]: {
                        ...state.userInputs[action.field],
                        value: action.value
                    }
                }
            };
        case actionTypes.TOGGLE_SHOW_PASSWORD:
            let type = '';
            if (!state.elements.password.show) {
                type = 'text'
            }
            else if (state.elements.password.show) {
                type = 'password'
            }
            return {
                ...state,
                elements: {
                    ...state.elements,
                    password: {
                        ...state.elements.password,
                        elementConfig: {
                            ...state.elements.password.elementConfig,
                            type: type
                        },
                        show: !state.elements.password.show
                    }
                }
            };
        case actionTypes.SET_VALIDATION_MESSAGE:
            return {
                ...state,
                elements: {
                    ...state.elements,
                    [action.key]: {
                        ...state.elements[action.key],
                        message: action.message
                    }
                }
            };
        case actionTypes.INIT_LOGIN:
            return {
                ...state,
                token: null,
                loading: true,
                error: null
            };
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                token: action.token,
                loading: false,
                error: null
            };
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case actionTypes.INIT_GET_PROFILE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    email: null,
                    picture: null,
                    username: null,
                    loading: true,
                    error: null
                }
            };
        case actionTypes.GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    email: action.email,
                    picture: action.picture,
                    username: action.username,
                    loading: false,
                    error: null
                }
            };
        case actionTypes.GET_PROFILE_FAIL:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    loading: false,
                    error: action.error
                }
            };
        default:
            return state;
    }
}

export default reducer;