import React from 'react';
import classes from './NavBar.module.css';

const NavBar = props => {
    return <div className={classes.Container} >

        <div
            className={[classes.NavItem, props.activeList === 'received' && classes.Active].join(' ')}
            onClick={() => props.setActiveList('received')} >
            Received
        </div>

        <div
            className={[classes.NavItem, props.activeList === 'sent' && classes.Active].join(' ')}
            onClick={() => props.setActiveList('sent')} >
            Sent
        </div>

    </div>
}

export default NavBar;