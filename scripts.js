// Function to toggle the visibility of the "Course content" section
function toggleCourseContent() {
    const courseSidebar = document.querySelector('.course-sidebar');
    courseSidebar.classList.toggle('hidden');
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



document.addEventListener('DOMContentLoaded', () => {
    const resizer = document.querySelector('.resizer');
    const sidebar = document.querySelector('.course-sidebar');
    const container = document.querySelector('.course-container');
    let isResizing = false;

    resizer.addEventListener('mousedown', function(e) {
        isResizing = true;
        document.addEventListener('mousemove', resizeSidebar);
        document.addEventListener('mouseup', stopResizing);
    });

    function resizeSidebar(e) {
        if (!isResizing) return;
        let newWidth = e.clientX - sidebar.getBoundingClientRect().left;
        if (newWidth > 100 && newWidth < 600) { // min and max width
            sidebar.style.width = newWidth + 'px';
            container.style.gridTemplateColumns = `${newWidth}px auto`;
        }
    }

    function stopResizing() {
        isResizing = false;
        document.removeEventListener('mousemove', resizeSidebar);
        document.removeEventListener('mouseup', stopResizing);
    }

    // Function to toggle the visibility of the "Course content" section
    window.toggleCourseContent = function() {
        sidebar.classList.toggle('hidden');
        if (sidebar.classList.contains('hidden')) {
            sidebar.style.width = '0';
        } else {
            sidebar.style.width = '250px';
        }
    }
});
