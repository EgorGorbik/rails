import React, {createRef, useEffect} from 'react';
import './style.css';

function AvatarTimeline(props) {
    let ava = createRef();

    // assign avatars location on timeline as soon as get valid data
    useEffect(() => {
        let distance = props.data.timeStamp / props.duration * 100;
        ava.current.style.marginLeft = `${distance}%`;
    }, [props.duration, ava, props.data.timeStamp]);

    return (
        <img
            className='avatarTimeline'
            id={props.data.name}
            src={`./img/${props.data.name}.jpg`}
            onClick={(e) => props.changeDuration(e, props.data)}
            ref={ava}
            alt='avatar on timeline'
        />
    )
}

export default AvatarTimeline;