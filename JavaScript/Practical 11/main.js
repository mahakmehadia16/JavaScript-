// main.js — main script to coordinate all module functions
import { startCountdown, highlightActiveSession } from './timer.js';
import { handleViewportChange, addDynamicSessions, setupAddSessionButton } from './ui.js';

// Select the countdown display element
const countdownDisplay = document.getElementById('countdown');

// Start countdown for next class (1 minute 30 seconds = 90 seconds)
startCountdown(90, countdownDisplay);

// Highlight active session every minute
setInterval(highlightActiveSession, 60000);
highlightActiveSession();

// Handle viewport resize
window.addEventListener('resize', handleViewportChange);
handleViewportChange();

// Enable event delegation and session addition
addDynamicSessions();
setupAddSessionButton();
