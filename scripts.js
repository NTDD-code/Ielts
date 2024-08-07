// Function to toggle the visibility of the "Course content" section
function toggleCourseContent() {
    const sidebar = document.querySelector('.course-sidebar');
    sidebar.classList.toggle('hidden');
    console.log('Toggled course content visibility:', sidebar.classList.contains('hidden'));
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
    videoElement.setAttribute('playsinline', '');
    videoContainer.appendChild(videoElement);

    // Initialize Plyr with the new video element
    const player = new Plyr(videoElement, {
        youtube: { noCookie: true }
    });

    // Set the video source
    player.source = {
        type: 'video',
        sources: [{ src: videoId, provider: 'youtube' }]
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
    // Initialize Plyr for the existing player element
    const playerElement = document.getElementById('player');
    if (playerElement) {
        new Plyr(playerElement, { youtube: { noCookie: true } });
    }
    console.log('Plyr initialized');

    // Resizer functionality
    const resizer = document.querySelector('.resizer');
    const sidebar = document.querySelector('.course-sidebar');
    const container = document.querySelector('.course-container');
    let isResizing = false;

    resizer.addEventListener('mousedown', function (e) {
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

    // Add event listener for the fullscreen button
    const fullscreenButton = document.getElementById('fullscreen-button');
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', function () {
            const playerInstance = Plyr.setup('#player')[0];
            playerInstance.fullscreen.toggle();
        });
    }
});

// Function to adjust video size
function adjustVideoSize() {
    const videoContainer = document.getElementById('video-container');
    videoContainer.style.width = '100%'; // Ensure video takes full width
    videoContainer.style.maxWidth = '800px'; // Set max width if needed
}

// Search functionality with notification
function searchCourses() {
    const input = document.getElementById('search-bar');
    const filter = input.value.toLowerCase();
    const lectures = document.querySelectorAll('.course-lecture');
    let hasResults = false;

    lectures.forEach(lecture => {
        const text = lecture.textContent.toLowerCase();
        if (text.includes(filter)) {
            lecture.style.display = '';
            hasResults = true;
        } else {
            lecture.style.display = 'none';
        }
    });

    const popupNotification = document.querySelector('.popup-notification');

    if (!hasResults) {
        if (popupNotification) {
            popupNotification.textContent = 'Không tìm thấy nội dung bạn muốn tìm.';
            popupNotification.classList.add('fade-in');
            popupNotification.classList.remove('fade-out');
            popupNotification.style.display = 'block';

            setTimeout(() => {
                popupNotification.classList.add('fade-out');
                popupNotification.classList.remove('fade-in');
                setTimeout(() => {
                    popupNotification.style.display = 'none';
                }, 500); // Match the fade-out duration
            }, 5000); // Display duration
        }
    } else {
        if (popupNotification) {
            popupNotification.classList.remove('fade-in', 'fade-out');
            popupNotification.style.display = 'none';
        }
    }
}

// Initialize the search bar and add the notification element
document.addEventListener('DOMContentLoaded', () => {
    // Add notification element to the DOM
    const popupNotification = document.createElement('div');
    popupNotification.className = 'popup-notification';
    document.body.appendChild(popupNotification);
});

// Global functions
window.loadVideo = loadVideo;
window.toggleCourseContent = toggleCourseContent;
window.toggleSection = function (sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.toggle('hidden');
};
window.searchCourses = searchCourses;

function toggleTheme() {
    const root = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    root.classList.toggle('light-mode');
    
    if (root.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
}
