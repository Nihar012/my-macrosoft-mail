import React from 'react';
import classes from './StylingToolbar.module.css';
import StylingButton from './StylingButton/StylingButton';
import { AiOutlineBold, AiOutlineItalic, AiOutlineUnderline } from 'react-icons/ai';
import { GoListUnordered, GoListOrdered } from 'react-icons/go';

const blockTypes = [
    { label: 'h1', style: 'header-one' },
    { label: 'h2', style: 'header-two' },
    { label: 'h3', style: 'header-three' },
    { label: 'h4', style: 'header-four' },
    { label: <GoListUnordered className={classes.StylingButtonIcon} />, style: 'unordered-list-item' },
    { label: <GoListOrdered className={classes.StylingButtonIcon} />, style: 'ordered-list-item' }
];

export const getBlockStyle = block => {
    switch (block.getType()) {
        case 'header-one':
            return classes.HeaderOne
        case 'header-two':
            return classes.HeaderTwo
        case 'header-three':
            return classes.HeaderThree
        case 'header-four':
            return classes.HeaderFour
        default:
            return null;
    }
}

const StylingToolbar = props => {
    const selection = props.editorState.getSelection();
    const blockType = props.editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

    return (
        <div className={classes.StylingToolbar} >
            <StylingButton
                label={<AiOutlineBold className={classes.StylingButtonIcon} />}
                toggle={props.bold} />
            <StylingButton
                label={<AiOutlineItalic className={classes.StylingButtonIcon} />}
                toggle={props.italic} />
            <StylingButton
                label={<AiOutlineUnderline className={classes.StylingButtonIcon} />}
                toggle={props.underline} />
            {blockTypes.map(type => {
                return <StylingButton
                    key={type.style}
                    label={type.label}
                    active={type.style === blockType}
                    toggle={props.toggle}
                    style={type.style} />
            })}
        </div>
    );
}

export default StylingToolbar;