import React, { useEffect, useState } from 'react';
import classes from './ComposeEmail.module.css';
import Editor from '../../RichTextEditor/Editor/Editor';
import { BiSend } from 'react-icons/bi';
import { convertToRaw } from 'draft-js';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const ComposeEmail = props => {

    const [disableSendButton, setDisableSendButton] = useState(true)

    useEffect(() => {

        return () => {
            props.resetUserInputs()
        }
    }, [])

    useEffect(() => {
        setDisableSendButton(props.userInputs.to ? false : true)

    }, [props.userInputs.to])

    const sendEmailHandler = () => {
        let data = {
            from: {
                username: props.profile.username,
                email: props.profile.email,
                picture: props.profile.picture
            },
            folderId: 2,
            timeStamp: new Date()
        }
        for (let key in props.userInputs) {
            data[key] = props.userInputs[key]
        }
        data.body = JSON.stringify(convertToRaw(props.userInputs.body.getCurrentContent()))

        props.closeComposeEmailModal()
        props.sendEmail(props.url, props.token, data)
    }

    return <div className={classes.Container} >

        <div className={classes.Heading} >Compose</div>

        <div className={classes.EmailTitle} >
            <input
                placeholder='Title'
                value={props.userInputs.title}
                onChange={(event) => props.changeUserInput('title', event.target.value)} />
        </div>

        <div className={classes.FromUser} >
            <div className={classes.Label} >From</div>
            <div className={classes.UserEmail} >{props.profile.email}</div>
        </div>

        <div className={classes.ToUser} >
            <div className={classes.Label} >To</div>
            <input
                value={props.userInputs.to}
                onChange={(event) => props.changeUserInput('to', event.target.value)} />
        </div>

        <div className={classes.EmailSubject} >
            <input
                placeholder='Add a subject'
                value={props.userInputs.subject}
                onChange={(event) => props.changeUserInput('subject', event.target.value)} />
        </div>

        <div className={classes.EmailBody} >
            <Editor value={props.userInputs.body} onChange={(value) => props.changeUserInput('body', value)} />
        </div>

        <div
            className={[classes.SendButton, disableSendButton && classes.Disable].join(' ')}
            onClick={disableSendButton ? () => {} : sendEmailHandler} >
            <BiSend className={classes.SendIcon} />
            <div className={classes.Label} >Send</div>
        </div>

    </div>
}


const mapStateToProps = state => {
    return {
        profile: state.auth.profile,
        userInputs: state.composeEmail.userInputs,
        url: state.composeEmail.url,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeUserInput: (field, value) => dispatch(actions.onChangeComposeEmailUserInput(field, value)),
        resetUserInputs: () => dispatch(actions.onResetComposeEmailUserInputs()),
        sendEmail: (url, token, data) => dispatch(actions.onSendEmail(url, token, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComposeEmail);