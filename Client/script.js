const teacherForm = document.getElementById("teacher-form");
const teacherTable = document.getElementById("teachers-table").querySelector("tbody");
const fetchTeachersButton = document.getElementById("fetch-teachers");
const searchTeacherForm = document.getElementById("search-teacher-form");
const toggleButton = document.getElementById('toggle-persal');
const persalInput = document.getElementById('teacher-persal');

let editingTeacher = null;

async function fetchTeachers() {
    try {
        const response = await fetch("http://localhost:3000/teacher");
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        const teachers = await response.json();
        updateTeacherTable(teachers);
    } catch (error) {
        console.error('Fetch error:', error);
        alert(`An error occurred while fetching teachers: ${error.message}`);
    }
}

function updateTeacherTable(teachers) {
    teacherTable.innerHTML = '';
    teachers.forEach(teacher => {
        const row = teacherTable.insertRow();
        row.insertCell(0).textContent = teacher.PERSAL; 
        row.insertCell(1).textContent = teacher.TITLE;
        row.insertCell(2).textContent = teacher.INITIAL;
        row.insertCell(3).textContent = teacher.SURNAME;
        row.insertCell(4).textContent = teacher.DEPARTMENT;
        row.insertCell(5).textContent = teacher.EMAIL;
        const actionCell = row.insertCell(6);
        actionCell.innerHTML = `
            <button onclick="startEditingTeacher('${teacher.PERSAL}')">Edit</button>
            <button onclick="deleteTeacher('${teacher.PERSAL}')">Delete</button>
        `;
    });
}

async function addOrUpdateTeacher(event) {
    event.preventDefault();

    const persal = document.getElementById('teacher-persal').value.trim();
    const title = document.getElementById('teacher-title').value.trim();
    const initial = document.getElementById('teacher-initial').value.trim();
    const surname = document.getElementById('teacher-surname').value.trim();
    const department = document.getElementById('teacher-department').value.trim();
    const email = document.getElementById('teacher-email').value.trim();

    if (!title || !initial || !surname || !department || !email) {
        alert('Please fill in all fields.');
        return;
    }

    const teacherData = { TITLE: title, INITIAL: initial, SURNAME: surname, DEPARTMENT: department, EMAIL: email };

    try {
        let response;
        if (editingTeacher) {
            response = await fetch(`http://localhost:3000/teacher/${editingTeacher}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(teacherData),
            });
            if (response.ok) {
                alert('Teacher updated successfully');
            } else {
                throw new Error(`Failed to update teacher: ${response.statusText}`);
            }
        } else {
            response = await fetch('http://localhost:3000/teacher', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ PERSAL: persal, ...teacherData }),
            });
            if (response.ok) {
                alert('Teacher added successfully');
            } else {
                throw new Error(`Failed to create teacher: ${response.statusText}`);
            }
        }
        resetTeacherForm();
        fetchTeachers();
    } catch (error) {
        console.error('Fetch error:', error);
        alert(`An error occurred while saving data: ${error.message}`);
    }
}

async function deleteTeacher(persal) {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    try {
        const response = await fetch(`http://localhost:3000/teacher/${persal}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Teacher deleted successfully');
            fetchTeachers();
        } else {
            throw new Error(`Failed to delete teacher: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        alert(`An error occurred while deleting data: ${error.message}`);
    }
}

function startEditingTeacher(persal) {
    fetch(`http://localhost:3000/teacher/${persal}`)
        .then(response => response.json())
        .then(teacher => {
            document.getElementById('teacher-persal').value = teacher.PERSAL;
            document.getElementById('teacher-title').value = teacher.TITLE;
            document.getElementById('teacher-initial').value = teacher.INITIAL;
            document.getElementById('teacher-surname').value = teacher.SURNAME;
            document.getElementById('teacher-department').value = teacher.DEPARTMENT;
            document.getElementById('teacher-email').value = teacher.EMAIL;

            editingTeacher = teacher.PERSAL;
            document.getElementById('teacher-form').style.display = 'block';
        })
        .catch(error => {
            console.error('Fetch error:', error);
            alert(`An error occurred while fetching teacher data: ${error.message}`);
        });
}

function resetTeacherForm() {
    teacherForm.reset();
    document.getElementById('Add-teachers').textContent = 'Add/Update';
    editingTeacher = null; 
}

async function searchTeacher(event) {
    event.preventDefault();

    const persal = document.getElementById('search-teacher-persal').value.trim();
    if (!persal) return alert('Please enter a Teacher Persal number.');

    try {
        const response = await fetch(`http://localhost:3000/teacher/${persal}`);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        const teacher = await response.json();
        updateTeacherTable([teacher]);
    } catch (error) {
        console.error('Fetch error:', error);
        alert(`Teacher not found or an error occurred: ${error.message}`);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (persalInput) {
        persalInput.style.display = 'none';
    }

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            persalInput.style.display = (persalInput.style.display === 'none') ? 'block' : 'none';
        });
    }
});

teacherForm.addEventListener('submit', addOrUpdateTeacher);
fetchTeachersButton.addEventListener('click', fetchTeachers);
searchTeacherForm.addEventListener('submit', searchTeacher);

fetchTeachers();
