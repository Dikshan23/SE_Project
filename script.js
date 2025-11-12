const form = document.getElementById("studentForm");
const tableBody = document.querySelector("#studentTable tbody");
const submitBtn = document.getElementById("submitBtn");

let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

function renderStudents() {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
        <td>
          <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
          <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const grade = document.getElementById("grade").value.trim();

if (!name || !age || !grade) return alert("Fields cannot be empty (Edit Branch)");



  if (editIndex === null) {
    // Add new student
    students.push({ name, age, grade });
  } else {
    // Update existing studentgit add script.js
    students[editIndex] = { name, age, grade };
    editIndex = null;
    submitBtn.textContent = "Add Student";
  }

  localStorage.setItem("students", JSON.stringify(students));
  renderStudents();
  form.reset();
});

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this student?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
  }
}

function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("grade").value = student.grade;
  editIndex = index;
  submitBtn.textContent = "Update Student";
}

renderStudents();
