// ui.js — handles dynamic UI and responsive design behavior
import { logEvent } from './helper.js';

// Function to change background color based on screen size
export function handleViewportChange() {
  if (window.innerWidth < 600) {
    document.body.style.background = '#f0f8ff';
  } else {
    document.body.style.background = 'white';
  }
}

// Function to add dynamic behavior (event delegation)
export function addDynamicSessions() {
  const sessionsDiv = document.getElementById('sessions');
  sessionsDiv.addEventListener('click', (e) => {
    if (e.target.classList.contains('session')) {
      alert("You selected: " + e.target.textContent);
      logEvent(`User clicked on: ${e.target.textContent}`);
    }
  });
}

// Function to dynamically add a new session
export function setupAddSessionButton() {
  const button = document.getElementById('addSessionBtn');
  const sessionsDiv = document.getElementById('sessions');

  button.addEventListener('click', () => {
    const newSessionTime = prompt("Enter session time (HH:MM):", "12:00");
    const newSessionName = prompt("Enter session name:", "React Basics");

    if (newSessionTime && newSessionName) {
      const div = document.createElement('div');
      div.classList.add('session');
      div.dataset.time = newSessionTime;
      div.textContent = `${newSessionName} - ${newSessionTime}`;
      sessionsDiv.appendChild(div);
      logEvent(`New session added: ${newSessionName} (${newSessionTime})`);
    }
  });
}
