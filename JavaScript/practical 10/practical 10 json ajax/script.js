// ---------- Fetch API ----------
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Simulate 2 seconds delay
    setTimeout(() => {
      let table = document.getElementById('fetchTable');
      table.innerHTML = "<tr><th>ID</th><th>Name</th><th>Marks</th><th>Grade</th></tr>";

      data.forEach(student => {
        let row = document.createElement('tr');
        if (student.marks > 90) row.classList.add('highlight');

        row.innerHTML = `
          <td>${student.id}</td>
          <td>${student.name}</td>
          <td>${student.marks}</td>
          <td>${student.grade}</td>
        `;
        table.appendChild(row);
      });
    }, 2000); // delay 2 seconds
  });

// ---------- jQuery AJAX ----------
$.getJSON('data.json', function(data) {
  let table = $('#jqueryTable');
  table.append("<tr><th>ID</th><th>Name</th><th>Marks</th><th>Grade</th></tr>");

  $.each(data, function(index, student) {
    let row = $('<tr></tr>');

    if (student.marks > 90) {
      row.addClass('highlight');
    }

    row.append(`<td>${student.id}</td>`);
    row.append(`<td>${student.name}</td>`);
    row.append(`<td>${student.marks}</td>`);
    row.append(`<td>${student.grade}</td>`);

    table.append(row);
  });
});
