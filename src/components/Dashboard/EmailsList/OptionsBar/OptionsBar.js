import React from 'react';
import classes from './OptionsBar.module.css';
import { IoAddCircleSharp } from 'react-icons/io5';
import { MdDeleteForever } from 'react-icons/md';
import { BiSelectMultiple } from 'react-icons/bi';

const OptionsBar = props => {



    return <div className={classes.Container} >

        {!props.isSelecting
            && <div className={classes.Option} onClick={props.showComposeEmailModal} >
                <IoAddCircleSharp className={classes.Icon} />
            </div>}

        {(props.isSelecting && props.selectedEmails > 0)
            && <div className={classes.Option} onClick={props.showDeleteModal} >
                <MdDeleteForever className={classes.Icon} />
            </div>}

        <div
            className={[classes.Option, classes.MultipleSelect, props.isSelecting && classes.Active].join(' ')}
            onClick={props.toggleIsSelecting} >
            <BiSelectMultiple className={classes.Icon} />
        </div>

    </div>
}

export default OptionsBar;