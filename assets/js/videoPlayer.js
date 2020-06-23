import getBlobDuration from "get-blob-duration";

const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeWrap = document.getElementById("jsVolumeWrap");
const volumeBtn = document.getElementById("jsVolumeBtn");
const volumeRange = document.getElementById("jsVolume");
const fullScrnBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

const progress = document.querySelector(".videoPlayer__progress");
const progressBar = document.querySelector(".progress__filled");

const registerView = () => {
    const videoId = window.location.href.split("/videos/")[1];
    fetch(`/api/${videoId}/view`, {
        method: "POST"
    })
}

function handlePlayClick() {
    if (videoPlayer.paused) {
        videoPlayer.play();
        playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
        return true;
    } else {
        videoPlayer.pause();
        playBtn.innerHTML = `<i class="fas fa-play"></i>`;
        return false;
    } 
}

function handleVolumeClick() {
    if (videoPlayer.muted) {
        videoPlayer.muted = false;
        volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
        volumeRange.value = videoPlayer.volume;
    } else {
        videoPlayer.muted = true;
        volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
        volumeRange.value = 0;
    }
}

function exitFullScreen() {
    fullScrnBtn.innerHTML = `<i class="fas fa-expand"></i>`;
    fullScrnBtn.addEventListener("click", goFullScreen);
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if ( document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function goFullScreen() {
    if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
    } else if (videoContainer.mozRequestFullScreen) {
        videoContainer.mozRequestFullScreen();
    } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
    } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
    }
    fullScrnBtn.innerHTML = `<i class="fas fa-compress"></i>`;
    fullScrnBtn.removeEventListener("click", goFullScreen);
    fullScrnBtn.addEventListener("click", exitFullScreen);
}

const formatDate = (seconds) => {
    const secondsNumber = parseInt(seconds, 10);
    let hours = Math.floor(secondsNumber/3600);
    let minutes = Math.floor((secondsNumber-hours*3600)/60);
    let totalSeconds = secondsNumber-hours*3600-minutes*60;

    if (hours < 10) {
        hours = `0${hours}`;
    }

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    if (totalSeconds < 10) {
        totalSeconds = `0${totalSeconds}`;
    }
    return `${hours}:${minutes}:${totalSeconds}`;
}

function getCurrentTime() {
    currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
}

async function setTotalTime() {
    let duration;
    
    if (!isFinite(videoPlayer.duration)) {
        const blob = await fetch(videoPlayer.src).then(response => response.blob());
        duration = await getBlobDuration(blob);
    } else {
        duration = videoPlayer.duration;
    }
    const totalTimeString = formatDate(videoPlayer.duration);
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 1000);
}

function handleEnded() {
    registerView();
    videoPlayer.currentTime = 0;
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

function handleDrag(event) {
    const {
        target: {value}
    } = event;
    videoPlayer.volume = value;

    if (value >= 0.6) {
        volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
    } else if (value >= 0.2) {
        volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
    } else {
        volumeBtn.innerHTML = `<i class="fas fa-volume-off"></i>`;
    }
}

function handleProgress() {
    const percent = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * videoPlayer.duration;
    videoPlayer.currentTime = scrubTime;
}

function handleVolumeBtn() {
    volumeWrap.onmouseover = function() {
        volumeRange.classList.add("open");
    }
    volumeWrap.onmouseleave = function(e) {
        volumeRange.classList.remove("open");
    }
}

function init() {
    videoPlayer.volume = 0.5;
    playBtn.addEventListener("click", handlePlayClick);
    videoPlayer.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    volumeRange.addEventListener("input", handleDrag);
    fullScrnBtn.addEventListener("click", goFullScreen);
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);
    videoPlayer.addEventListener("ended", handleEnded);

    playBtn.addEventListener('timeupdate', handleProgress);
    videoPlayer.addEventListener('timeupdate', handleProgress);

    let mousedown = false;
    progress.addEventListener('click', scrub);
    progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
    progress.addEventListener('mousedown', () => mousedown = true);
    progress.addEventListener('mouseup', () => mousedown = false);
}

if (videoContainer) {
    init();
    handleVolumeBtn();
}