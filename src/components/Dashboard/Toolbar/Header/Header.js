import React from 'react';
import classes from './Header.module.css';

const Header = props => {
    return <div className={classes.Container} >
        <img className={classes.ProfilePicture} src={props.picture} />
        <div className={classes.Username} >{props.username}</div>
    </div>
}

export default Header;