import React from 'react';
import classes from './Loader.module.css';
import Skeleton from '../../../../UI/Skeleton/Skeleton';

const Loader = props => {
    return <div className={classes.Container} >

        <div className={classes.ProfilePicture} ><Skeleton /></div>
        <div className={classes.Username} ><Skeleton /></div>

        <div className={classes.ShimmerWrapper} >
            <div className={classes.Shimmer} ></div>
        </div>

    </div>
}

export default Loader;