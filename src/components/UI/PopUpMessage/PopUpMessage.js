import React from 'react';
import classes from './PopUpMessage.module.css';
import { CircleSpinner } from 'react-spinners-kit';
import { GoCheck } from 'react-icons/go';
import { FiAlertTriangle } from 'react-icons/fi';

const PopUpMessage = props => {

    let icon;
    switch(props.status){
        case 'Sending':
            icon = <CircleSpinner size={16} color='whitesmoke' />
            break;
        case 'Sent':
            icon = <GoCheck className={classes.SentIcon} />
            break;
        case 'Failed':
            icon = <FiAlertTriangle className={classes.FailedIcon} />
            break;
        default:
            icon = null;
    }

    return <div className={classes.PopUpMessage} >
        <div className={classes.Status} >{props.status}</div>
        {icon}        
    </div>
}

export default PopUpMessage;