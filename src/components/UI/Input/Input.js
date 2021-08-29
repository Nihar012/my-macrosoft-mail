import React from 'react';
import classes from './Input.module.css';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const Input = props => {

    let inputElement;
    switch (props.elementType) {
        case 'text':
            inputElement = <input
                className={[classes.InputElement, props.message && classes.Invalid].join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                onKeyDown={props.onKeyDown} />
            break;
        case 'password':
            inputElement = <input
                className={[classes.InputElement, classes.Password, props.message && classes.Invalid].join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        default:
            inputElement = null;
    }

    let showPasswordButton;
    if (props.elementType === 'password' && !props.showPassword) {
        showPasswordButton = <div className={classes.ShowPasswordButtonContainer} onClick={props.toggleShowPassword} >
            <AiFillEyeInvisible className={classes.Icon} />
        </div>
    }
    else if (props.elementType === 'password' && props.showPassword) {
        showPasswordButton = <div className={classes.ShowPasswordButtonContainer} onClick={props.toggleShowPassword} >
            <AiFillEye className={classes.Icon} />
        </div>
    }


    return (
        <div className={classes.Container} >
            <div className={classes.InputElementWrapper} >
                {inputElement}
                {showPasswordButton}
            </div>
            <div className={classes.ValidationMessage} >{props.message}</div>
        </div>
    )
}

export default Input;