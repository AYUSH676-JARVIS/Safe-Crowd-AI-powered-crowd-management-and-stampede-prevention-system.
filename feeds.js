// This file handles the functionality related to managing feeds. 
// It includes functions for adding new feeds, displaying available feeds, 
// and updating the UI based on the selected feeds.

let availableFeeds = [];

// Function to add a new feed
function addFeed(feedName) {
    if (feedName && !availableFeeds.includes(feedName)) {
        availableFeeds.push(feedName);
        updateFeedList();
    } else {
        alert("Feed name is either empty or already exists.");
    }
}

// Function to update the UI with the available feeds
function updateFeedList() {
    const feedListContainer = document.getElementById('feed-list');
    feedListContainer.innerHTML = '';

    availableFeeds.forEach(feed => {
        const feedItem = document.createElement('div');
        feedItem.className = 'feed-item';
        feedItem.innerHTML = `
            <input type="checkbox" name="feed-checkbox" value="${feed}" class="feed-checkbox">
            <span onclick="playFeed('${feed}', '${feed.toLowerCase().replace(/\s+/g, '-')}.mp4')" class="feed-name">${feed}</span>
        `;
        feedListContainer.appendChild(feedItem);
    });
}

// Function to play the selected feed
function playFeed(feedName, videoSource) {
    // Logic to play the video feed
    console.log(`Playing feed: ${feedName} from source: ${videoSource}`);
}

// Function to get the currently running feeds
function getRunningFeeds() {
    // This function should return the feeds that are currently active
    return availableFeeds.filter(feed => {
        // Logic to determine if the feed is currently running
        return true; // Placeholder for actual logic
    });
}

// Function to update the deployed units based on running feeds
function updateDeployedUnits() {
    const runningFeeds = getRunningFeeds();
    const deployedUnitsContainer = document.getElementById('deployed-units');
    deployedUnitsContainer.innerHTML = '';

    runningFeeds.forEach(feed => {
        const unitItem = document.createElement('div');
        unitItem.className = 'unit-item';
        unitItem.innerText = `Unit for ${feed} is currently deployed.`;
        deployedUnitsContainer.appendChild(unitItem);
    });
}

// Event listener for adding a new feed
document.getElementById('add-feed-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const feedInput = document.getElementById('feed-input');
    addFeed(feedInput.value);
    feedInput.value = ''; // Clear input after adding
});