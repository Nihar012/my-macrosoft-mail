import React from 'react';
import classes from './EmailCard.module.css';
import { calculateTime } from '../../../utilities';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { convertToPlainText, calculateDateDifference } from '../../../utilities';

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
            break;
        default:
            fromUsername = null;
    }

    const title = props.data.title.length > 0 ? props.data.title : '(no title)'
    const emailBody = convertToPlainText(props.data.body) ? convertToPlainText(props.data.body) : '(no body)'

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
                ? <img className={classes.ProfilePic} src={props.data.from.picture} alt='' />
                : <div className={classes.SelectedMarker} ><IoIosCheckmarkCircle className={classes.Icon} /></div>}

            <div className={classes.EmailAttributes} >
                <div className={classes.Header} >
                    <div className={classes.Attribute1} >{fromUsername}</div>
                    <div className={classes.Time} >{calculateTime(props.data.timeStamp)}</div>
                </div>
                <div className={classes.Attribute2} >{props.type === 'sent' ? toUsername : title}</div>
                <div className={classes.Attribute3} >{props.type === 'sent' ? title : emailBody}</div>
            </div>

        </div>
    </React.Fragment>
}

export default EmailCard;