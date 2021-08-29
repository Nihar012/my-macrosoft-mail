import React from 'react';
import classes from './Login.module.css';
import Form from '../../components/UI/Form/Form';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Login = props => {
    return <div className={classes.Container} >

        <Form
            heading='Macrosoft Mail'
            inputs={<React.Fragment>
                <Input
                    elementType='text'
                    elementConfig={props.elements.email.elementConfig}
                    value={props.userInputs.email.value}
                    message={props.elements.email.message}
                    changed={(event) => props.setUserInputHandler('email', event.target.value)} />
                <Input
                    elementType='password'
                    elementConfig={props.elements.password.elementConfig}
                    value={props.userInputs.password.value}
                    message={props.elements.password.message}
                    showPassword={props.elements.password.show}
                    toggleShowPassword={props.toggleShowPasswordHandler}
                    changed={(event) => props.setUserInputHandler('password', event.target.value)} />
            </React.Fragment>}
            submitButtonLabel='LOG IN'
            loading={props.loading}
            error={props.error}
            onFormSubmit={() => props.loginSubmitHandler(props.url, props.userInputs)} />

    </div>
}


const mapStateToProps = state => {
    return {
        elements: state.auth.elements,
        userInputs: state.auth.userInputs,
        loading: state.auth.loading,
        error: state.auth.error,
        url: state.auth.url
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setUserInputHandler: (field, value) => dispatch(actions.onSetUserInput(field, value)),
        toggleShowPasswordHandler: () => dispatch(actions.onToggleShowPassword()),
        loginSubmitHandler: (url, userInputs) => dispatch(actions.onLogInSubmit(url, userInputs))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);