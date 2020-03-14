import React, {useEffect, useState} from 'react';
import Video from "./Components/Video";
import './shared/styles/index.css';
import CommentInput from "./Components/CommentInput/index";
import Comments from "./Components/Comments";
import {highlightArea, cleanCanvas} from "./shared";
import nanoid from 'nanoid'

function App() {
    const [ comments, changeComments ] = useState([]);
    const [ player, setPlayer ] = useState('play');
    const [ timePassed, setTimePassed ] = useState(0);
    const [ isAbilityHighlight, changeAbilityHighlight ] = useState('disable_area_selection');
    const [ coordinates, changeCoordinates ] = useState([]);

    const video = React.createRef();

    // get data from local json
    useEffect(() => {
        fetch('./api/index.json')
            .then(response => response.json())
            .then(data => changeComments(data))
    }, []);

    const rewindVideo = (time, data) => {
        cleanCanvas();
        if(data && data.highlight) {
            data.highlight.map(e => highlightArea(e));
            pausePlayer();
        }
        video.current.currentTime = time;
    };

    const addComment = (myComment) => {
        myComment.id = nanoid(8);
        myComment.timeStamp = timePassed;
        changeComments([...comments, myComment])
    };

    const deleteComment = (myComment) => {
        let newComments = comments.filter(e => e.id !== myComment.id);
        changeComments(newComments)
    };

    const pausePlayer = () => {
        setPlayer('play');
        video.current.pause();
    };

    // adjust video playback
    const changePlayer = () => {
        switch (player) {
            case 'play':
                setPlayer('pause');
                video.current.play();
                cleanCanvas();
                break;
            case 'pause':
                setPlayer('play');
                video.current.pause();
                break;
            default:
        }
    };

    return (
        <div className='main'>
            <div className='main_content'>
                <Video
                    timePassed={timePassed}
                    setTimePassed={setTimePassed}
                    ref={video}
                    comments={comments}
                    player={player}
                    changePlayer={changePlayer}
                    pausePlayer={pausePlayer}
                    isAbilityHighlight={isAbilityHighlight}
                    changeCoordinates={changeCoordinates}
                    coordinates={coordinates}
                />
                <CommentInput
                    player={player}
                    changePlayer={changePlayer}
                    addComment={addComment}
                    isAbilityHighlight={isAbilityHighlight}
                    changeAbilityHighlight={changeAbilityHighlight}
                    coordinates={coordinates}
                    changeCoordinates={changeCoordinates}
                />
            </div>
            <Comments
                deleteComment={deleteComment}
                rewindVideo={rewindVideo}
                comments={comments}
            />
        </div>
    );
}

export default App;

