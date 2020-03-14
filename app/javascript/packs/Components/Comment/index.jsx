import React from 'react';
import {convertToTime} from '../../shared';
import { Icon } from 'semantic-ui-react';
import './style.css';

function Comment(props) {
    return(
        <div className='comment'>
            <div className='comment_header'>
                <img className='avatar' src={`./img/${props.data.name}.jpg`} alt='avatar'/>
                <div className='commentator_name'>{props.data.name}</div>
                {props.data.name === 'me' && <Icon className='icon_trash' name='trash alternate' size='small' onClick={() => props.deleteComment(props.data)}/>}
            </div>
            <div
                onClick={() => {props.rewindVideo(props.data.timeStamp, props.data)}} //rewind to a specific comment
                className='time_stamp'>
                {convertToTime(props.data.timeStamp)}
                {
                    // if the comment is accompanied by a highlight, add a special icon
                    props.data.highlight && <Icon className='icon_brush' name='paint brush' size='small'/>
                }
            </div>
            <div className='comment_text'>{props.data.comment}</div>
        </div>
    )
}

export default Comment;