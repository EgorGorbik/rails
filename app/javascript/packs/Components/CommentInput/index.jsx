import React, {useEffect, useState} from 'react';
import {Icon} from "semantic-ui-react";
import './style.css';

function CommentInput(props) {
    const [ comment, changeComment ] = useState('');
    const [ buttonStyle, changeButtonStyle ] = useState('disable');

    // depending on the contents of the input, add or remove the ability to send
    useEffect(() => {
        if(comment) {
            changeButtonStyle('able')
        } else {
            changeButtonStyle('disable')
        }
    }, [comment]);

    const addComment = () => {
        if(!comment) return;
        if(props.coordinates[0]) { // if the comment has a selection
            props.addComment({
                name: 'me',
                comment: comment,
                timeStamp: "40",
                highlight: props.coordinates
            });
            props.changeCoordinates([])
        } else {
            props.addComment({
                name: 'me',
                comment: comment,
                timeStamp: "40"
            })
        }
        changeComment('')
    };

    // change the state of the selection icon depending on the click
    const changeAbilityHighlight =  () => {
        if(props.isAbilityHighlight === 'disable_area_selection') {
            props.changeAbilityHighlight('able_area_selection')
        } else {
            props.changeAbilityHighlight('disable_area_selection')
        }
    };

    return (
        <div className='commentInput-wrapper'>
            <div className='input-wrapper'>
                <input
                    value={comment}
                    onChange={(e) => {changeComment(e.target.value); props.player === 'pause' && props.changePlayer()}}
                    placeholder='Leave your comment here...'
                />
                <Icon className={`icon_area_selection ${props.isAbilityHighlight}`} name='paint brush' size='large' onClick={changeAbilityHighlight}/>
                <button className={'send_comment ' + buttonStyle} onClick={addComment}>
                    Send
                </button>
            </div>
        </div>
    )
}

export default CommentInput;