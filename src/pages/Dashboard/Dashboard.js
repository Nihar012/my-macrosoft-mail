import React, { useEffect, useState } from 'react';
import classes from './Dashboard.module.css';
import Toolbar from '../../components/Dashboard/Toolbar/Toolbar';
import EmailsList from '../../components/Dashboard/EmailsList/EmailsList';
import EmailDetails from '../../components/Dashboard/EmailDetails/EmailDetails';
import Modal from '../../components/UI/Modal/Modal';
import ComposeEmail from '../../components/Dashboard/ComposeEmail/ComposeEmail';
import ConfirmationPrompt from '../../components/UI/ConfirmationPrompt/ConfirmationPrompt';
import { Route, withRouter } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Dashboard = props => {

    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [showComposeEmailModal, setShowComposeEmailModal] = useState(false)
    const [openedEmailId, setOpenedEmailId] = useState(null)

    const nodeRef = React.useRef(null)

    useEffect(() => {
        props.getProfile(props.profileUrl, props.token)

    }, [])

    const openEmailHandler = (id) => {
        props.history.push(`${props.match.path}/email/${id}`)
    }

    const showComposeEmailModalHandler = () => {
        setShowComposeEmailModal(true)
    }

    const closeComposeEmailModalHandler = () => {
        setShowComposeEmailModal(false)
    }

    return <div className={classes.Container} >

        <Toolbar profile={props.profile} logout={() => setShowLogoutModal(true)} />

        <CSSTransition
            in={props.location.pathname === '/dashboard'}
            nodeRef={nodeRef}
            timeout={100}
            classNames={{
                enterActive: classes.ShowEmailsList,
                exitActive: classes.HideEmailsList
            }} >
            <EmailsList
                active={props.location.pathname === '/dashboard'}
                openEmail={openEmailHandler}
                openedEmailId={openedEmailId}
                showComposeEmailModal={showComposeEmailModalHandler} />
        </CSSTransition>

        <CSSTransition
            in={props.location.pathname.includes('/dashboard/email/')}
            nodeRef={nodeRef}
            timeout={100}
            mountOnEnter
            unmountOnExit
            classNames={{
                enterActive: classes.ShowEmailDetails,
                exitActive: classes.HideEmailDetails
            }} >
            <Route path={`${props.match.path}/email/:id`} >
                <EmailDetails prevPath={props.match.path} setOpenedEmailId={setOpenedEmailId} />
            </Route>
        </CSSTransition>

        <Modal
            type='composeEmailModal'
            show={showComposeEmailModal}
            close={closeComposeEmailModalHandler}
            showCloseButton >
            <ComposeEmail closeComposeEmailModal={closeComposeEmailModalHandler} />
        </Modal>

        <Modal
            type='confirmationModal'
            show={showLogoutModal}
            close={() => setShowLogoutModal(false)} >
            <ConfirmationPrompt
                message='Are you sure you want to log out?'
                cancel={() => setShowLogoutModal(false)}
                proceed={props.logout} />
        </Modal>

    </div >
}


const mapStateToProps = state => {
    return {
        profile: state.auth.profile,
        token: state.auth.token,
        profileUrl: state.auth.profile.url
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: (url, token) => dispatch(actions.onGetProfile(url, token)),
        logout: () => dispatch(actions.onLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Dashboard));