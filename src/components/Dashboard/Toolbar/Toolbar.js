import React from 'react';
import classes from './Toolbar.module.css';
import Header from './Header/Header';
import Loader from './Header/Loader/Loader';
import { AiOutlineLogout } from 'react-icons/ai';

const Toolbar = props => {
    return <div className={classes.Container} >

        {props.profile.loading && <Loader />}

        {!props.profile.loading && <Header picture={props.profile.picture} username={props.profile.username} />}

        <div className={classes.LogoutButton} onClick={props.logout} >
            <AiOutlineLogout className={classes.LogoutIcon} />
        </div>

    </div>
}

export default Toolbar;