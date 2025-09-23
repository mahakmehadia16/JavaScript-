let userName = prompt("Enter your name:");

alert("Hello, " + userName + "!");

console.log("User name:", userName);

// Set welcome message
document.getElementById("student-info").innerText =
  "Welcome, " + userName + "! We're happy to have you on this journey.";

// Update student name in profile section
document.getElementById("student-name").innerText = userName;
