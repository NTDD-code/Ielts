let player;
let controlsVisible = false;

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.style.display = section.style.display === 'block' ? 'none' : 'block';
}

function loadVideo(videoId, event) {
    event.stopPropagation(); // Prevent the section from collapsing

    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = ''; // Clear the container

    const source = {
        type: 'video',
        sources: [
            {
                src: videoId,
                provider: 'youtube',
            },
        ],
    };

    const videoElement = document.createElement('video');
    videoElement.id = 'player';
    videoElement.controls = true;
    videoElement.crossOrigin = 'anonymous';
    videoElement.setAttribute('playsinline', '');
    videoContainer.appendChild(videoElement);

    player = new Plyr(videoElement, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'fullscreen'],
        autoplay: false,
        hideControls: false,
        resetOnEnd: true,
        clickToPlay: true,
        loadSprite: true,
    });

    player.source = source; // Set the video source

    document.getElementById('video-controls').style.display = 'block'; // Show the custom controls
}

document.addEventListener('DOMContentLoaded', function () {
    initializePlyr();
});

function initializePlyr() {
    const video = document.querySelector('#player');
    player = new Plyr(video, {
        controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'fullscreen'],
        autoplay: false,
        hideControls: false,
        resetOnEnd: true,
        clickToPlay: true,
        loadSprite: true,
    });
}

function showControls() {
    const videoControls = document.getElementById('video-controls');
    videoControls.style.display = 'block';
    controlsVisible = true;
    setTimeout(() => {
        if (controlsVisible) {
            videoControls.style.display = 'none';
            controlsVisible = false;
        }
    }, 3000); // Hide controls after 3 seconds of inactivity
}

function hideControls() {
    const videoControls = document.getElementById('video-controls');
    videoControls.style.display = 'none';
    controlsVisible = false;
}

function playVideo() {
    player.play();
}

function pauseVideo() {
    player.pause();
}

function toggleFullscreen() {
    player.fullscreen.toggle();
}

function seekVideo(value) {
    player.currentTime = (player.duration / 100) * value;
}

function toggleCaptions() {
    player.toggleCaptions();
}

function setPlaybackRate(value) {
    player.playbackRate = parseFloat(value);
}
