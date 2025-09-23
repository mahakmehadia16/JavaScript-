const subjects = ["Math", "Science", "English", "Computer", "History"];

window.onload = function () {
  fillDropdown("1");
  fillDropdown("2");
  fillDropdown("3");
  document.getElementById("time").textContent = new Date().toLocaleString();
};

function fillDropdown(id) {
  const select = document.getElementById("sub3_" + id);
  subjects.forEach(sub => {
    const opt = document.createElement("option");
    opt.value = sub;
    opt.textContent = sub;
    select.appendChild(opt);
  });
}

function updateSliderValue(id) {
  document.getElementById("sliderValue" + id).textContent = document.getElementById("sub1_" + id).value;
}

function calculate(id) {
  const name = document.getElementById("name" + id).value;
  const roll = document.getElementById("roll" + id).value;
  const sub1 = parseInt(document.getElementById("sub1_" + id).value);
  const sub2 = parseInt(document.getElementById("sub2_" + id).value);
  const sub3 = parseInt(document.getElementById("sub3Marks_" + id).value);
  const sub3Name = document.getElementById("sub3_" + id).value;

  if ([sub1, sub2, sub3].some(m => m < 0 || m > 100 || isNaN(m))) {
    alert("Marks must be between 0 and 100");
    return false;
  }

  const avg = (sub1 + sub2 + sub3) / 3;
  let grade = "";
  if (avg >= 90) grade = "A";
  else if (avg >= 75) grade = "B";
  else if (avg >= 50) grade = "C";
  else grade = "F";

  let remark = "";
  switch (true) {
    case avg >= 90:
      remark = "Excellent";
      break;
    case avg >= 75:
      remark = "Good";
      break;
    case avg >= 50:
      remark = "Needs Improvement";
      break;
    default:
      remark = "Fail";
  }

  const result = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Roll:</strong> ${roll}</p>
    <p><strong>Subject 1:</strong> ${sub1}</p>
    <p><strong>Subject 2:</strong> ${sub2}</p>
    <p><strong>Subject 3 (${sub3Name}):</strong> ${sub3}</p>
    <p><strong>Average:</strong> ${avg.toFixed(2)}</p>
    <p><strong>Grade:</strong> ${grade}</p>
    <p><strong>Remark:</strong> ${remark}</p>
  `;
  document.getElementById("output" + id).innerHTML = result;
  return false; // prevent form submission
}
