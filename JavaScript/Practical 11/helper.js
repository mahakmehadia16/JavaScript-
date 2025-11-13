// helper.js — utility functions for formatting and logging

// Function to format minutes and seconds properly
export function formatTime(minutes, seconds) {
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Function to log important events to console (for debugging)
export function logEvent(message) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${message}`);
}
