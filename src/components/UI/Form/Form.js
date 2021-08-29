import React from 'react';
import classes from './Form.module.css';
import { CircleSpinner } from 'react-spinners-kit';

const Form = props => {

    const keyDownHandler = (event) => {
        if (event.key === 'Enter' && props.onFormSubmit) {
            event.preventDefault()
            props.onFormSubmit()
        }
    }

    return (
        <div className={classes.Container} onKeyDown={keyDownHandler} >

            {props.heading && <div className={classes.Heading} >{props.heading}</div>}

            {props.inputs}

            <div className={classes.SubmitButton} onClick={props.onFormSubmit} >
                {props.submitButtonLabel}
                {props.loading && <div className={classes.SpinnerContainer} >
                    <CircleSpinner size={16} color='#eee' />
                </div>}
            </div>

            {props.error
                && <div
                    className={classes.ErrorMessageContainer} >
                    <div className={classes.Message} >
                        {props.error.response ?
                            props.error.response.data.error.message :
                            props.error.message}
                    </div>
                </div>}

        </div>
    )
}

export default Form;