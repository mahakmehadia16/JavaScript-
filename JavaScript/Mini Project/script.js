/* script.js — Smart Student Portal
   Every block labelled with Practical numbers as requested.
*/

/* ------------------ PRACTICAL 9: Apply saved theme preference ------------------ */
(function(){
  const saved = localStorage.getItem('ssp_theme');
  if(saved === 'dark') document.body.classList.add('dark');
})();

/* ------------------ PRACTICAL 2: Fees Calculator (variables, let/const, template literals) ------------------ */
document.addEventListener('DOMContentLoaded', function(){

  // PRACTICAL 2 elements
  const tuition = document.getElementById('tuition');
  const exam = document.getElementById('exam');
  const library = document.getElementById('library');
  const calcFees = document.getElementById('calcFees');
  const feesResult = document.getElementById('feesResult');

  if(calcFees){
    calcFees.addEventListener('click', function(){
      // var/let/const demonstration (Practical 2)
      var t = Number(tuition.value) || 0;
      let e = Number(exam.value) || 0;
      const l = Number(library.value) || 0;

      // Default parameter usage via function
      function computeTotal(a = 0, b = 0, c = 0){ return a + b + c; }

      const total = computeTotal(t,e,l);
      feesResult.textContent = `Total fees payable: ₹${total.toFixed(2)}`; // template literal
      console.log('P2 Fees calculated', {t,e,l,total});
    });
  }

  /* ------------------ PRACTICAL 3: Grade evaluation (conditionals & switch) ------------------ */
  const marksInput = document.getElementById('marksInput');
  const evalGrade = document.getElementById('evalGrade');
  const gradeOutput = document.getElementById('gradeOutput');

  if(evalGrade){
    evalGrade.addEventListener('click', function(){
      const m = Number(marksInput.value);
      if(isNaN(m) || m < 0 || m > 100){
        gradeOutput.textContent = 'Please enter valid marks between 0 and 100';
        return;
      }
      let grade, remark;
      if(m >= 90) grade = 'A+';
      else if(m >= 80) grade = 'A';
      else if(m >= 70) grade = 'B+';
      else if(m >= 60) grade = 'B';
      else grade = 'C';

      // switch used for assigning remark (Practical 3)
      switch(true){
        case (m>=90): remark = 'Outstanding'; break;
        case (m>=75): remark = 'Very Good'; break;
        case (m>=60): remark = 'Good'; break;
        default: remark = 'Work Hard';
      }
      gradeOutput.textContent = `Grade: ${grade} — ${remark}`;
      console.log('P3 Grade evaluated', {m,grade,remark});
    });
  }

  /* ------------------ PRACTICAL 4: Student ID validation, reverse, palindrome ------------------ */
  const stuId = document.getElementById('stuId');
  const checkId = document.getElementById('checkId');
  const idResult = document.getElementById('idResult');

  if(checkId){
    checkId.addEventListener('click', function(){
      try{
        const id = (stuId.value || '').trim();
        if(!id) throw new Error('Please enter Student ID');
        // Example ID format: starts with letter, digits, ends with letter (simple)
        const valid = /^[A-Za-z]\d{4}[A-Za-z]?/.test(id);
        const reversed = id.split('').reverse().join('');
        const isPal = id === reversed;
        idResult.innerHTML = `Valid format: ${valid} <br> Reversed: ${reversed} <br> Palindrome: ${isPal}`;
      } catch(err){
        idResult.textContent = 'Error: ' + err.message;
      }
    });
  }

  /* ------------------ PRACTICAL 5: Course cart — arrays & HOFs ------------------ */
  const coursesList = document.getElementById('coursesList');
  const totalCredits = document.getElementById('totalCredits');
  const totalFees = document.getElementById('totalFees');
  const applyScholar = document.getElementById('applyScholar');

  // sample courses array (Practical 5)
  const courses = [
    {code:'CS101', name:'Data Structures', credits:3, fee:1500},
    {code:'CS102', name:'Algorithms', credits:3, fee:1600},
    {code:'CS201', name:'DBMS', credits:2, fee:1200},
    {code:'CS301', name:'Operating Systems', credits:3, fee:1800}
  ];

  if(coursesList){
    // render with checkboxes (map)
    coursesList.innerHTML = courses.map((c, idx) => `
      <label><input type="checkbox" data-idx="${idx}" class="courseChk"> ${c.code} - ${c.name} (${c.credits}cr) — ₹${c.fee}</label>
    `).join('');
  }

  function computeCart(){
    const checked = Array.from(document.querySelectorAll('.courseChk:checked')).map(ch => courses[Number(ch.dataset.idx)]);
    const credits = checked.map(c => c.credits).reduce((a,b)=>a+b,0);
    const fees = checked.map(c => c.fee).reduce((a,b)=>a+b,0);
    totalCredits.textContent = credits;
    totalFees.textContent = fees.toFixed(2);
    return {checked,credits,fees};
  }

  document.addEventListener('change', function(e){
    if(e.target && e.target.classList.contains('courseChk')){
      computeCart();
    }
  });

  if(applyScholar){
    applyScholar.addEventListener('click', function(){
      const cart = computeCart();
      // apply 20% scholarship if credits >= 9 (example) — use filter/reduce
      let discount = 0;
      if(cart.credits >= 9) discount = 0.2;
      const finalFees = cart.fees * (1 - discount);
      alert(`Scholarship: ${discount*100}% applied. Final Fees: ₹${finalFees.toFixed(2)}`);
    });
  }

  /* ------------------ PRACTICAL 7: To-do (Assignments) — DOM methods ------------------ */
  /* ------------------ PRACTICAL 7: To-do (Assignments) — DOM methods ------------------ */
const taskInput = document.getElementById('taskInput');
const addTask = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

if (taskList) {
  
  // load tasks from localStorage (Practical 9 integration)
  const savedTasks = JSON.parse(localStorage.getItem('ssp_tasks') || '[]');
  savedTasks.forEach(t => appendTask(t.text, t.done));

  if(addTask){
    addTask.addEventListener('click', function(){
      const txt = (taskInput.value || '').trim();
      if(!txt) return;
      appendTask(txt, false);
      taskInput.value = '';
      saveTasks();
    });
  }

  function appendTask(text, done){
    const li = document.createElement('li'); 
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.checked = !!done;
    const span = document.createElement('span');
    span.textContent = text;
    const del = document.createElement('button');
    del.textContent = 'Remove';
    del.addEventListener('click', () => { li.remove(); saveTasks(); });

    chk.addEventListener('change', () => saveTasks());
    li.appendChild(chk);
    li.appendChild(span);
    li.appendChild(del);
    taskList.appendChild(li);
  }

  function saveTasks(){
    const tasks = Array.from(taskList.querySelectorAll('li')).map(li => {
      return { text: li.querySelector('span').textContent, done: li.querySelector('input').checked };
    });
    localStorage.setItem('ssp_tasks', JSON.stringify(tasks));
  }

}


  /* ------------------ PRACTICAL 10: Fetch JSON timetable (mini API mock) ------------------ */
  const loadTimetable = document.getElementById('loadTimetable');
  const ttBody = document.querySelector('#timetable tbody');

  if(loadTimetable){
    loadTimetable.addEventListener('click', function(){
      fetch('data.json')
        .then(res => res.json())
        .then(data => {
          // data.timetable is expected
          ttBody.innerHTML = data.timetable.map(r => `<tr><td>${r.day}</td><td>${r.hour1}</td><td>${r.hour2}</td><td>${r.hour3}</td></tr>`).join('');
        })
        .catch(err => {
          console.error('Failed to load timetable', err);
          alert('Failed to load timetable. Run a local server (Live Server) and try again.');
        });
    });
  }

  /* ------------------ PRACTICAL 8: Profile form validation (onsubmit, onblur, onchange) ------------------ */
  const profileForm = document.getElementById('profileForm');
  const fullName = document.getElementById('fullName');
  const emailAddr = document.getElementById('emailAddr');
  const ageNum = document.getElementById('ageNum');
  const selectCourse = document.getElementById('selectCourse');
  const profileMsg = document.getElementById('profileMsg');

  if(fullName){
    fullName.addEventListener('blur', function(){ if(fullName.value.trim().length < 3) fullName.style.border = '2px solid red'; else fullName.style.border=''; });
  }
  if(emailAddr){
    emailAddr.addEventListener('change', function(){ if(!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(emailAddr.value)) emailAddr.style.border='2px solid red'; else emailAddr.style.border=''; });
  }

  if(profileForm){
    profileForm.addEventListener('submit', function(e){
      e.preventDefault();
      try{
        const name = fullName.value.trim();
        const email = emailAddr.value.trim();
        const age = Number(ageNum.value);
        if(!name || !email || isNaN(age)) throw new Error('Please fill all fields correctly');
        if(age < 16) throw new Error('Age must be at least 16');
        // save profile to localStorage (Practical 9)
        localStorage.setItem('ssp_profile', JSON.stringify({name,email,age,course:selectCourse.value}));
        profileMsg.textContent = 'Profile saved locally!';
      } catch(err){
        profileMsg.textContent = 'Error: ' + err.message;
      }
    });
  }

  /* ------------------ PRACTICAL 6: String methods & regex (bio tools) ------------------ */
  const bio = document.getElementById('bio');
  const countBioVowels = document.getElementById('countBioVowels');
  const reverseBio = document.getElementById('reverseBio');
  const bioResult = document.getElementById('bioResult');

  if(countBioVowels){
    countBioVowels.addEventListener('click', function(){
      const txt = bio.value || '';
      const count = (txt.match(/[aeiou]/gi) || []).length;
      bioResult.textContent = `Vowel count: ${count}`;
    });
  }
  if(reverseBio){
    reverseBio.addEventListener('click', function(){
      bioResult.textContent = `Reversed: ${bio.value.split('').reverse().join('')}`;
    });
  }

  /* ------------------ PRACTICAL 11: Countdown to exam (timers) ------------------ */
  const examDatetime = document.getElementById('examDatetime');
  const startCountdown = document.getElementById('startCountdown');
  const countdownDisplay = document.getElementById('countdownDisplay');
  let countdownInterval = null;

  if(startCountdown){
    startCountdown.addEventListener('click', function(){
      const dt = new Date(examDatetime.value);
      if(isNaN(dt)) { countdownDisplay.textContent = 'Please set a valid date/time'; return; }
      if(countdownInterval) clearInterval(countdownInterval);
      function update(){
        const now = new Date();
        let diff = dt - now;
        if(diff <= 0){ clearInterval(countdownInterval); countdownDisplay.textContent = 'Exam started!'; alert('Exam time reached'); return; }
        const days = Math.floor(diff / (1000*60*60*24));
        diff -= days*(1000*60*60*24);
        const hrs = Math.floor(diff / (1000*60*60));
        diff -= hrs*(1000*60*60);
        const mins = Math.floor(diff / (1000*60));
        const secs = Math.floor((diff % (1000*60))/1000);
        countdownDisplay.textContent = `${days}d ${hrs}h ${mins}m ${secs}s remaining`;
      }
      update();
      countdownInterval = setInterval(update, 1000);
    });
  }

  /* ------------------ PRACTICAL 1: Console examples (external script) ------------------ */
  console.log('P1: External JS loaded - All practicals attached where applicable.');

  /* ------------------ PRACTICAL 9: Theme toggle button binds ------------------ */
  const toggleTheme = document.getElementById('toggleTheme');
  if(toggleTheme){
    toggleTheme.addEventListener('click', function(){
      const isDark = document.body.classList.toggle('dark');
      localStorage.setItem('ssp_theme', isDark ? 'dark' : 'light');
    });
  }

}); // DOMContentLoaded end
