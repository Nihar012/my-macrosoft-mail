import React, { useEffect } from 'react';
import classes from './EmailDetails.module.css';
import Viewer from '../../RichTextEditor/Viewer/Viewer';
import { Redirect, withRouter } from 'react-router-dom';
import { IoChevronBackSharp } from 'react-icons/io5';
import { connect } from 'react-redux';
import { calculateDate, calculateTime } from '../../../utilities';

const EmailDetails = props => {

    const openedEmail = props.receivedEmails.concat(props.sentEmails).filter(email => email.id === props.match.params.id)[0]

    useEffect(() => {
        if (openedEmail)
            props.setOpenedEmailId(openedEmail.id)

    }, [openedEmail])

    const setFromUserNameHandler = () => {
        if (props.profile.username === openedEmail.from.username)
            return 'You'
        else
            return openedEmail.from.username
    }

    const setToUserNameHandler = () => {
        if (props.profile.email === openedEmail.to)
            return 'to: me'
        else
            return `to: ${openedEmail.to}`
    }

    const goBackHandler = () => {
        props.history.replace(props.prevPath)
    }

    return !openedEmail ? <Redirect to='/dashboard' />
        : <div className={classes.Container} >

            <div className={classes.Header} >

                <div className={classes.LeftContent} >
                    <div className={classes.BackButton} onClick={goBackHandler} >
                        <IoChevronBackSharp className={classes.Icon} />
                    </div>
                    <img className={classes.ProfilePic} src={openedEmail.from.picture} />
                    <div className={classes.EmailParties} >
                        <div className={classes.FromUsername} >{setFromUserNameHandler()}</div>
                        <div className={classes.ToUsername} >{setToUserNameHandler()}</div>
                    </div>
                </div>

                <div className={classes.Date} >
                    {`${calculateDate(openedEmail.timeStamp)}, ${calculateTime(openedEmail.timeStamp)}`}
                </div>

            </div>

            <div className={classes.EmailSubject} >{openedEmail.subject}</div>

            <div className={classes.EmailBody} >
                <Viewer content={openedEmail.body} />
            </div>

        </div>
}


const mapStateToProps = state => {
    return {
        receivedEmails: state.emails.folders[1],
        sentEmails: state.emails.folders[2],
        profile: state.auth.profile
    }
}

export default connect(mapStateToProps)(withRouter(EmailDetails));