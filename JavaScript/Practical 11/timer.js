// timer.js — contains countdown and session highlight logic
import { formatTime, logEvent } from './helper.js';

// Function to start a countdown timer
export function startCountdown(duration, display) {
  let time = duration; // time in seconds

  const timer = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Update countdown text
    display.textContent = `Next session starts in ${formatTime(minutes, seconds)}`;

    // Change color when less than 1 minute left
    if (time <= 60) {
      display.style.color = 'red';
    } else {
      display.style.color = '#333';
    }

    time--;

    // Stop timer when it reaches 0
    if (time < 0) {
      clearInterval(timer);
      display.textContent = "Session Started!";
      display.style.color = 'green';
      logEvent("Countdown completed.");
    }
  }, 1000);
}

// Function to highlight the currently active session
export function highlightActiveSession() {
  const sessions = document.querySelectorAll('.session');
  const now = new Date();
  const currentHour = now.getHours();

  sessions.forEach(session => {
    const hour = parseInt(session.dataset.time.split(':')[0]);
    if (hour === currentHour) {
      session.classList.add('active');
    } else {
      session.classList.remove('active');
    }
  });
}
