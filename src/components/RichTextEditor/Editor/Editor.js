import React, { useRef } from 'react'
import classes from './Editor.module.css';
import { RichUtils } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import StylingToolbar, { getBlockStyle } from './StylingToolbar/StylingToolbar';

const TextEditor = props => {

    const editorRef = useRef()

    const onChangeHandler = (editorState) => {
        props.onChange(editorState)
    }

    const toggleBlockTypeHandler = (blockType) => {
        onChangeHandler(RichUtils.toggleBlockType(props.value, blockType));
    };

    const boldHandler = () => {
        onChangeHandler(RichUtils.toggleInlineStyle(props.value, 'BOLD'))
    }

    const italicHandler = () => {
        onChangeHandler(RichUtils.toggleInlineStyle(props.value, 'ITALIC'))
    }

    const underlineHandler = () => {
        onChangeHandler(RichUtils.toggleInlineStyle(props.value, 'UNDERLINE'));
    }

    return <React.Fragment>

        <StylingToolbar
            editorState={props.value}
            toggle={toggleBlockTypeHandler}
            bold={boldHandler}
            italic={italicHandler}
            underline={underlineHandler} />

        <div className={classes.Editor} onClick={() => editorRef.current.focus()} >
            <Editor
                ref={editorRef}
                editorState={props.value}
                blockStyleFn={getBlockStyle}
                onChange={onChangeHandler} />
        </div>

    </React.Fragment>
}

export default TextEditor;