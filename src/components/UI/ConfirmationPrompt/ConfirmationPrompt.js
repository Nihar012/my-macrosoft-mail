import React from 'react';
import classes from './ConfirmationPrompt.module.css';

const ConfirmationPrompt = props => {

    return <div className={classes.Container} >

        <div className={classes.Message} >{props.message}</div>

        <div className={classes.ButtonContainer} >
            <div className={classes.Button} onClick={props.cancel} >No</div>
            <div className={classes.Button} onClick={props.proceed} >Yes</div>
        </div>

    </div>
}

export default ConfirmationPrompt;