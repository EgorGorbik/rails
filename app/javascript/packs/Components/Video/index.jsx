import React, {useState} from 'react';
import { Icon } from 'semantic-ui-react';
import '../../shared/styles/index.css';
import AvatarTimeline from "./AvatarTimeline";
import {highlightArea, convertToTime} from "../../shared";
import './style.css';

const Video = React.forwardRef((props, ref) => {
    const [ duration, setDuration ] = useState('00:00');

    // video playback
    const progressUpdate = () => {
        const time = Math.trunc(ref.current.currentTime);
        props.setTimePassed(time);
        const positionBar = document.getElementById("durationBar");
        positionBar.style.width = (ref.current.currentTime / ref.current.duration * 100) + "%";
    };

    // ability to rewind to a specific place
    const changeDuration = (e, data) => {
        document.getElementsByClassName('video-container')[0].innerHTML = '';
        document.getElementsByClassName('video-container')[0].append(ref.current);
        // when click on a comment on the timeline
        if(data && data.highlight) {
            data.highlight.map(e => highlightArea(e));
            props.pausePlayer();
        }
        // rewind video on time in comments
        let len = e.pageX - document.getElementsByClassName('barContainer')[0].offsetLeft;
        let difference = (len/ document.getElementsByClassName('barContainer')[0].offsetWidth);
        ref.current.currentTime = difference * ref.current.duration;
    };

    // convert the coordinates of the selection from pixels to percent
    const convertToPercent = (e) => {
        let left = e.pageX - document.getElementsByClassName('video-container')[0].offsetLeft;
        let top = e.pageY - document.getElementsByClassName('video-container')[0].offsetTop;
        left = left / document.getElementsByClassName('video-container')[0].offsetWidth * 100;
        top = top / document.getElementsByClassName('video-container')[0].offsetHeight * 100;
        if(top > 90) return;
        return({pageX: left, pageY: top})
    };

    const writeСoordinates = (e) => {
        if(props.isAbilityHighlight === 'able_area_selection') {
            e = convertToPercent(e);
            e && highlightArea(e);
            e && props.changeCoordinates([...props.coordinates, {pageX: e.pageX, pageY: e.pageY}])
        }
    };

    return(
        <div className='video-wrapper'>
            <div className='player'>
                <div className='video-container'>
                    <video ref={ref}
                           onClick={(e) => writeСoordinates(e)}
                           onTimeUpdate={progressUpdate}
                           onCanPlay={(e) => {setDuration(e.target.duration)}}>
                        <source src='./video/test.mp4' type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'/>
                    </video>
                </div>
                <div className='barContainer' onClick={(e) => changeDuration(e)}>
                    <div id="durationBar"></div>
                </div>
                <div className='timeline'>
                    {props.comments[0] &&
                     props.comments.map(e => <AvatarTimeline
                         key={e.id}
                         changeDuration={changeDuration}
                         duration={duration}
                         data={e}
                     />)}
                </div>
                <div className='player_control_panel'>
                    <Icon className='icon_player' name={props.player} size='large' onClick={props.changePlayer}/>
                    <div className='time'>{convertToTime(props.timePassed)} / {convertToTime(duration)}</div>
                </div>
            </div>
        </div>
    )
});

export default Video;