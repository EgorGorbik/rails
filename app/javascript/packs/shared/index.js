export const convertToTime = (seconds) => {
    let minutes = Math.trunc(seconds / 60);
    seconds = Math.trunc(seconds % 60);
    if(minutes < 10) {
        minutes = '0' + minutes
    }
    if(seconds < 10) {
        seconds = '0' + seconds
    }
    return minutes + ':' + seconds;
};

export const highlightArea = (e) => {
    let left = e.pageX;
    let bottom = e.pageY;
    let area = document.createElement('div');
    area.className = 'highlightArea';
    area.style.width = '20%';
    area.style.height = '20%';
    left -= 10;
    bottom -= 10;
    area.style.marginLeft = left + '%';
    area.style.top = bottom + '%';
    document.getElementsByClassName('video-container')[0].append(area);
};

export const cleanCanvas = () => {
    const video = document.getElementsByTagName('video')[0];
    document.getElementsByClassName('video-container')[0].innerHTML = '';
    document.getElementsByClassName('video-container')[0].append(video);
};