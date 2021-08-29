import React from 'react';
import classes from './EmailCard.module.css';
import { EditorState, convertFromRaw } from 'draft-js';
import { calculateTime } from '../../../utilities';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { calculateDateDifference } from '../../../utilities';

const EmailCard = props => {

    let fromUsername;
    let toUsername;
    switch (props.type) {
        case 'received':
            fromUsername = props.data.from.username
            break;
        case 'sent':
            fromUsername = 'From: You'
            toUsername = `to ${props.data.to}`
    }

    const containerClassNames = [classes.Container]
    if (props.isOpened)
        containerClassNames.push(classes.Opened)
    if (props.isSelected)
        containerClassNames.push(classes.Selected)

    const dividerDate = calculateDateDifference(props.previousDate, props.data.timeStamp)


    return <React.Fragment>

        {dividerDate
            && <div className={classes.DividerDateContainer} >
                <div className={classes.Underline} ></div>
                <div className={classes.DividerDate} >{dividerDate.toUpperCase()}</div>
            </div>}

        <div className={containerClassNames.join(' ')} onClick={props.clicked} >

            {!props.isSelected
                ? <img className={classes.ProfilePic} src={props.data.from.picture} />
                : <div className={classes.SelectedMarker} ><IoIosCheckmarkCircle className={classes.Icon} /></div>}

            <div className={classes.EmailAttributes} >
                <div className={classes.Header} >
                    <div className={classes.FromUsername} >{fromUsername}</div>
                    <div className={classes.Time} >{calculateTime(props.data.timeStamp)}</div>
                </div>
                {toUsername
                    ? <div className={classes.ToUsername} >{toUsername}</div>
                    : <div className={classes.EmailTitle} >{props.data.title}</div>}
                <div className={classes.EmailBody} >{EditorState.createWithContent(convertFromRaw(JSON.parse(props.data.body))).getCurrentContent().getPlainText('\u0000')}</div>
            </div>

        </div>
    </React.Fragment>
}

export default EmailCard;