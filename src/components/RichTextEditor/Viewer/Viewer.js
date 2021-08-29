import React from 'react'
import { EditorState, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import { getBlockStyle } from '../Editor/StylingToolbar/StylingToolbar';

const Viewer = props => {

    const content = EditorState.createWithContent(convertFromRaw(JSON.parse(props.content)))

    return <Editor
        editorState={content}
        blockStyleFn={getBlockStyle}
        readOnly
        onChange={() => { }} />
}

export default Viewer;