let attendees = [];
let speakers = [];
let sessions = [];
let profiles = [];
let editingProfileId = null;

function showSection(sectionId) {
    document.querySelectorAll('.card').forEach(card => {
        card.classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}

function registerAttendee() {
    const name = document.getElementById("attendeeName").value;
    const email = document.getElementById("attendeeEmail").value;

    if (name && email) {
        attendees.push({ name, email });
        alert("Attendee Registered Successfully!");
        document.getElementById("attendeeName").value = "";
        document.getElementById("attendeeEmail").value = "";
        updateDashboard();
    }
}

// Backwards-compatible wrapper for HTML button (older markup uses addRegister)
function addRegister() {
    registerAttendee();
}

function addSpeaker() {
    const name = document.getElementById("speakerName").value;
    const topic = document.getElementById("speakerTopic").value;

    if (name && topic) {
        speakers.push({ name, topic });
        alert("Speaker Added!");
        document.getElementById("speakerName").value = "";
        document.getElementById("speakerTopic").value = "";
        updateDashboard();
    }
}

function addSession() {
    const title = document.getElementById("sessionTitle").value;
    const time = document.getElementById("sessionTime").value;

    if (title && time) {
        sessions.push({ title, time });
        alert("Session Created!");
        document.getElementById("sessionTitle").value = "";
        document.getElementById("sessionTime").value = "";
       updateDashboard();
    }
}

// Profiles: save/load from localStorage
function loadProfiles() {
    const raw = localStorage.getItem('profiles');
    if (raw) {
        try { profiles = JSON.parse(raw); } catch (e) { profiles = []; }
    }
    renderProfiles();
}

function saveProfiles() {
    localStorage.setItem('profiles', JSON.stringify(profiles));
}

function addProfile() {
    const name = document.getElementById('profileName').value.trim();
    const role = document.getElementById('profileRole').value.trim();
    const bio = document.getElementById('profileBio').value.trim();
    const avatar = document.getElementById('profileAvatar').value.trim();

    if (!name) { alert('Please provide a name for the profile.'); return; }

    if (editingProfileId) {
        const idx = profiles.findIndex(p => p.id === editingProfileId);
        if (idx !== -1) {
            profiles[idx] = { id: editingProfileId, name, role, bio, avatar };
        }
        editingProfileId = null;
        document.getElementById('profileAddBtn').textContent = 'Add Profile';
    } else {
        profiles.push({ id: Date.now().toString(), name, role, bio, avatar });
    }

    saveProfiles();
    renderProfiles();
    document.getElementById('profileName').value = '';
    document.getElementById('profileRole').value = '';
    document.getElementById('profileBio').value = '';
    document.getElementById('profileAvatar').value = '';
}

function renderProfiles() {
    const list = document.getElementById('profileList');
    if (!list) return;
    list.innerHTML = '';
    profiles.forEach(p => {
        const li = document.createElement('li');
        li.className = 'profile-item';
        const avatarHtml = p.avatar ? `<img src="${p.avatar}" class="profile-avatar" alt="avatar">` : '';
        li.innerHTML = `${avatarHtml}<strong>${p.name}</strong> <em>${p.role || ''}</em><p>${p.bio || ''}</p>`;

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => editProfile(p.id);
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Delete';
        delBtn.onclick = () => deleteProfile(p.id);

        const btnWrap = document.createElement('div');
        btnWrap.className = 'profile-buttons';
        btnWrap.appendChild(editBtn);
        btnWrap.appendChild(delBtn);
        li.appendChild(btnWrap);

        list.appendChild(li);
    });
}

function editProfile(id) {
    const p = profiles.find(x => x.id === id);
    if (!p) return;
    document.getElementById('profileName').value = p.name;
    document.getElementById('profileRole').value = p.role || '';
    document.getElementById('profileBio').value = p.bio || '';
    document.getElementById('profileAvatar').value = p.avatar || '';
    editingProfileId = id;
    document.getElementById('profileAddBtn').textContent = 'Save Changes';
}

function deleteProfile(id) {
    if (!confirm('Delete this profile?')) return;
    profiles = profiles.filter(p => p.id !== id);
    saveProfiles();
    renderProfiles();
}

// initialize profiles on load
loadProfiles();

function updateDashboard() {
    const attendeeList = document.getElementById("attendeeList");
    const speakerList = document.getElementById("speakerList");
    const sessionList = document.getElementById("sessionList");

    attendeeList.innerHTML = "";
    speakerList.innerHTML = "";
    sessionList.innerHTML = "";

    attendees.forEach(a => {
        attendeeList.innerHTML += `<li>${a.name} (${a.email})</li>`;
    });

    speakers.forEach(s => {
        speakerList.innerHTML += `<li>${s.name} - ${s.topic}</li>`;
    });

    sessions.forEach(s => {
        sessionList.innerHTML += `<li>${s.title} at ${s.time}</li>`;
    });
}

/* Animated heading: simple typewriter effect */
function animateHeading(opts) {
    const el = document.getElementById('mainHeading');
    if (!el) return;
    const text = el.getAttribute('data-text') || el.textContent || '';
    const speed = (opts && opts.speed) || 90;
    el.textContent = '';
    el.classList.add('caret');
    let i = 0;
    const t = setInterval(() => {
        el.textContent += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(t);
            // keep caret blinking (handled by CSS)
        }
    }, speed);
}

// Start the heading animation after window loads
window.addEventListener('load', () => {
    animateHeading({ speed: 90 });
});
