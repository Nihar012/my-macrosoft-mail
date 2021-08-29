import React, { useEffect, useState } from 'react';
import classes from './EmailsList.module.css';
import NavBar from './NavBar/NavBar';
import OptionsBar from './OptionsBar/OptionsBar';
import Emails from './Emails/Emails';
import Modal from '../../UI/Modal/Modal';
import ConfirmationPrompt from '../../UI/ConfirmationPrompt/ConfirmationPrompt';
import PopUpMessage from '../../UI/PopUpMessage/PopUpMessage';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

const EmailsList = props => {

    const [activeList, setActiveList] = useState('received')
    const [isSelecting, setIsSelecting] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [showSendingStatus, setShowSendingStatus] = useState({ status: 'None', show: false })

    useEffect(() => {
        props.getEmails(props.url, props.token)

    }, [])

    useEffect(() => {
        if (props.deleteEmails.selected.length !== 0 && !isSelecting)
            props.unSelectAllEmails()

    }, [isSelecting])

    useEffect(() => {
        if (props.composeEmailLoading)
            setShowSendingStatus({ status: 'Sending', show: true })
        if (showSendingStatus.status === 'Sending' && !props.composeEmailLoading && !props.composeEmailError) {
            setShowSendingStatus({ status: 'Sent', show: true })
            setTimeout(() => {
                setShowSendingStatus({ status: 'None', show: false })
            }, 1000)
        }
        if (showSendingStatus.status === 'Sending' && !props.composeEmailLoading && props.composeEmailError) {
            setShowSendingStatus({ status: 'Failed', show: true })
            setTimeout(() => {
                setShowSendingStatus({ status: 'None', show: false })
            }, 1000)
        }

    }, [props.composeEmailLoading, props.composeEmailError])

    const setActiveListHandler = (type) => {
        setActiveList(type)
    }

    const toggleIsSelectingHandler = () => {
        setIsSelecting(prevState => !prevState)
    }

    const deleteSelectedEmailsHandler = () => {
        props.deleteSelectedEmails(props.deleteEmails.url, props.token, props.deleteEmails.selected, () => setIsSelecting(false))
        setShowDeleteModal(false)
    }

    return <div className={[classes.Container, !props.active && classes.Hide].join(' ')} >

        <div className={classes.ActionsContainer} >
            <NavBar activeList={activeList} setActiveList={setActiveListHandler} />
            <OptionsBar
                showComposeEmailModal={props.showComposeEmailModal}
                isSelecting={isSelecting}
                selectedEmails={props.deleteEmails.selected.length}
                toggleIsSelecting={toggleIsSelectingHandler}
                showDeleteModal={() => setShowDeleteModal(true)} />
        </div>

        <Emails
            type={activeList}
            emails={activeList === 'received' ? props.receivedEmails : props.sentEmails}
            loading={props.loading}
            openEmail={props.openEmail}
            openedEmailId={props.openedEmailId}
            isSelecting={isSelecting}
            selectEmail={props.selectEmail}
            unSelectEmail={props.unSelectEmail}
            selectedEmails={props.deleteEmails.selected} />

        <Modal
            type='confirmationModal'
            show={showDeleteModal}
            close={() => setShowDeleteModal(false)} >
            <ConfirmationPrompt
                message={`Permanantly delete ${props.deleteEmails.selected.length} item/s?`}
                cancel={() => setShowDeleteModal(false)}
                proceed={deleteSelectedEmailsHandler} />
        </Modal>

        {showSendingStatus.show
            && <PopUpMessage status={showSendingStatus.status} />}

    </div>
}


const mapStateToProps = state => {
    return {
        receivedEmails: state.emails.folders[1],
        sentEmails: state.emails.folders[2],
        loading: state.emails.loading,
        url: state.emails.url,
        deleteEmails: state.emails.deleteEmails,
        composeEmailLoading: state.composeEmail.loading,
        composeEmailError: state.composeEmail.error,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getEmails: (url, token) => dispatch(actions.onGetEmails(url, token)),
        selectEmail: (id) => dispatch(actions.onSelectEmail(id)),
        unSelectEmail: (id) => dispatch(actions.onUnSelectEmail(id)),
        unSelectAllEmails: () => dispatch(actions.onUnSelectAllEmails()),
        deleteSelectedEmails: (url, token, ids, resetIsSelecting) => dispatch(actions.onDeleteEmails(url, token, ids, resetIsSelecting))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailsList);