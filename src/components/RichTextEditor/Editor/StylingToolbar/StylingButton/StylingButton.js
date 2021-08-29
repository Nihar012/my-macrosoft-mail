import React from 'react';
import classes from './StylingButton.module.css';

const StylingButton = props => {
    const toggleHandler = event => {
        event.preventDefault();
        props.toggle(props.style);
    };

    return (
        <div className={[classes.StylingButton, props.active && classes.Active].join(' ')} onClick={toggleHandler} >
            {props.label}
        </div>
    );
}

export default StylingButton;
