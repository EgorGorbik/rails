import React from 'react';
import Comment from "../Comment/index";
import './style.css';

function Comments(props) {
    return (
        <div className='comments'>
            {props.comments.map(e => <Comment key={e.id} deleteComment={props.deleteComment} rewindVideo={props.rewindVideo} data={e}/>)}
        </div>
    )
}

export default Comments;
