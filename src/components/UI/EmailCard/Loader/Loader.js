import React from 'react';
import classes from './Loader.module.css';
import Skeleton from '../../Skeleton/Skeleton';

const Loader = props => {

    return <div className={classes.Container} >

        <div className={classes.ProfilePic} ><Skeleton /></div>

        <div className={classes.EmailAttributes} >
            <div className={classes.Header} >
                <div className={classes.Attribute1} ><Skeleton /></div>
                <div className={classes.Time} ><Skeleton /></div>
            </div>
            <div className={classes.Attribute2} ><Skeleton /></div>
            <div className={classes.Attribute3} ><Skeleton /></div>
        </div>

        <div className={classes.ShimmerWrapper} >
            <div className={classes.Shimmer} ></div>
        </div>

    </div>
}

export default Loader;