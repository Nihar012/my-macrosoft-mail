import React from 'react';
import classes from './Emails.module.css';
import EmailCard from '../../../UI/EmailCard/EmailCard';
import Loader from '../../../UI/EmailCard/Loader/Loader';

const Emails = props => {

    const clickedHandler = (id) => {

        const isSelected = props.selectedEmails.includes(id)

        if (props.isSelecting) {
            if (isSelected)
                props.unSelectEmail(id)
            else
                props.selectEmail(id)
        }
        else
            props.openEmail(id)
    }

    return <div className={classes.Container} >

        {!props.loading && props.emails.map((email, index) => {
            return <EmailCard
                key={email.id}
                data={email}
                type={props.type}
                clicked={() => clickedHandler(email.id)}
                isOpened={props.openedEmailId === email.id}
                isSelected={props.selectedEmails.includes(email.id)}
                previousDate={props.emails[index - 1] ? props.emails[index - 1].timeStamp : null} />
        })}

        {props.loading
            && <React.Fragment>
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
                <Loader />
            </React.Fragment>}

    </div>
}

export default Emails;