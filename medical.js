
let medicalTeams = [];
let availableFeeds = [];


const form = document.getElementById('team-assignment-form');
const tableBody = document.getElementById('team-table-body');
const activeCountLabel = document.getElementById('active-team-count');
const feedInput = document.getElementById('feed-input'); 
const feedList = document.getElementById('feed-list'); 


document.addEventListener('DOMContentLoaded', () => {
    renderTable();
});



function renderTable() {
    tableBody.innerHTML = ''; 
    
    medicalTeams.forEach(team => {
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-white/5 transition-colors animate-row border-b border-white/5';
        
        const statusClass = team.status === 'Online' 
            ? 'bg-safe/10 text-safe border-safe/20' 
            : 'bg-warning/10 text-warning border-warning/20';
        
        tr.innerHTML = `
            <td class="px-6 py-4 font-mono text-white text-sm">${team.teamId}</td>
            <td class="px-6 py-4 text-gray-400 text-sm truncate max-w-xs" title="${team.feeds.join(', ')}">
                ${team.feeds.join(', ') || '<span class="italic text-gray-600">No feeds assigned</span>'}
            </td>
            <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusClass}">
                    <span class="h-1.5 w-1.5 rounded-full ${team.status === 'Online' ? 'bg-safe' : 'bg-warning'}"></span>
                    ${team.status}
                </span>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
                <button onclick="deleteTeam('${team.id}')" class="text-danger hover:text-red-400 text-xs font-bold uppercase hover:underline transition-all">Recall</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    activeCountLabel.innerText = `${medicalTeams.length} Active Units`;
}

function addFeed() {
    const newFeed = feedInput.value.trim();
    if (newFeed && !availableFeeds.includes(newFeed)) {
        availableFeeds.push(newFeed);
        updateFeedList();
        feedInput.value = '';
    } else {
        alert("Feed is either empty or already exists.");
    }
}

function updateFeedList() {
    feedList.innerHTML = '';
    availableFeeds.forEach(feed => {
        const li = document.createElement('li');
        li.textContent = feed;
        li.onclick = () => playFeed(feed);
        feedList.appendChild(li);
    });
}

function playFeed(feedName) {
    // Logic to display the camera view for the selected feed
    // Update UI elements accordingly
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const checkboxes = document.querySelectorAll('input[name="feed-checkbox"]:checked');
    const selectedFeeds = Array.from(checkboxes).map(cb => cb.value);

    if (selectedFeeds.length === 0) {
        alert("Please check at least one feed box to deploy a team.");
        return;
    }

    const newIdVal = "MED-UNIT-" + Math.floor(Math.random() * 100);

    const newTeam = {
        id: Date.now().toString(),
        teamId: newIdVal,
        feeds: selectedFeeds,
        status: 'Online'
    };
    medicalTeams.push(newTeam);

    form.reset();
    renderTable();
});

function deleteTeam(id) {
    if(confirm('Recall this medical unit?')) {
        medicalTeams = medicalTeams.filter(t => t.id !== id);
        renderTable();
    }
}
