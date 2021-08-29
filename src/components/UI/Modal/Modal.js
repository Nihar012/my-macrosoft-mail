import React from 'react';
import classes from './Modal.module.css';
import CSSTransition from 'react-transition-group/CSSTransition';
import { IoMdClose } from 'react-icons/io';

const Modal = props => {

    const nodeRef = React.useRef(null)    //---------------------to prevent depricated findDOMNode warning

    let modalClassnames = [classes.Modal];
    switch (props.type) {
        case 'composeEmailModal':
            modalClassnames.push(classes.ComposeEmailModal);
            break;
        case 'confirmationModal':
            modalClassnames.push(classes.ConfirmationModal);
            break;
        default:
            modalClassnames.push('')
    }

    return <React.Fragment>

        {props.show && <div className={classes.Backdrop} onClick={props.close} ></div>}

        <CSSTransition
            nodeRef={nodeRef}
            in={props.show}
            timeout={200}
            mountOnEnter
            unmountOnExit
            classNames={{
                enterActive: classes.ShowModal,
                exitActive: classes.CloseModal
            }} >
            <div className={modalClassnames.join(' ')} >
                {props.showCloseButton
                    && <div className={classes.CloseButton} onClick={props.close} >
                        <IoMdClose className={classes.CloseIcon} />
                    </div>}
                {props.children}
            </div>
        </CSSTransition>

    </React.Fragment>
}

export default Modal;