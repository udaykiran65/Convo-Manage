let attendees = [];
let speakers = [];
let sessions = [];

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
