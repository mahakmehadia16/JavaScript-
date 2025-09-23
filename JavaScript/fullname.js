function showFullName() {
  let first = document.getElementById("first").value;
  let last = document.getElementById("last").value;
  document.getElementById("result").innerHTML = "Full Name: " + first + " " + last;
}