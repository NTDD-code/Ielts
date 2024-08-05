// Function to toggle the visibility of the "Course content" section
function toggleCourseContent() {
    const courseSidebar = document.querySelector('.course-sidebar');
    courseSidebar.style.display = courseSidebar.style.display === 'none' || courseSidebar.style.display === '' ? 'block' : 'none';
    console.log('Toggled course content visibility:', courseSidebar.style.display);
}

// Function to load video using Plyr
function loadVideo(videoId, event) {
    event.preventDefault();
    console.log('Loading video:', videoId);

    // Clear the existing video container
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = '';

    // Create a new video element
    const videoElement = document.createElement('video');
    videoElement.id = 'player';
    videoElement.controls = true;
    videoElement.crossOrigin = 'anonymous';
    videoElement.setAttribute('playsinline', '');
    videoContainer.appendChild(videoElement);

    // Initialize Plyr with the new video element
    const player = new Plyr(videoElement, {
        youtube: {
            noCookie: true
        }
    });

    // Set the video source
    player.source = {
        type: 'video',
        sources: [
            {
                src: videoId,
                provider: 'youtube'
            }
        ]
    };

    // Try to play the video and log the result
    player.play().then(() => {
        console.log('Video playing:', videoId);
    }).catch(error => {
        console.error('Error playing video:', error);
    });
}

// Initialize Plyr when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const playerElement = document.getElementById('player');
    if (playerElement) {
        new Plyr(playerElement, {
            youtube: {
                noCookie: true
            }
        });
    }
    console.log('Plyr initialized');
});
