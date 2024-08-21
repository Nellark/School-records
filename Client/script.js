let teachers = [];


document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('teacher-form').onsubmit = addOrUpdateTeacher;
    document.getElementById('fetch-teachers').addEventListener('click', fetchTeachers);
    document.getElementById('search-teacher-form').onsubmit = searchTeacher;
    fetchTeachers();
});


async function fetchTeachers() {
    try {
        const response = await fetch('http://localhost:3000/teacher');
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        teachers = await response.json();
        updateTeacherTable();
    } catch (error) {
        console.error('Fetch error:', error);
        alert(`An error occurred while fetching data: ${error.message}`);
    }
}


async function addOrUpdateTeacher(event) {
    event.preventDefault();

    const persal = document.getElementById('teacher-persal').value.trim();
    const title = document.getElementById('teacher-title').value.trim();
    const initial = document.getElementById('teacher-initial').value.trim();
    const surname = document.getElementById('teacher-surname').value.trim();
    const department = document.getElementById('teacher-department').value.trim();
    const email = document.getElementById('teacher-email').value.trim();

    if (!persal || !title || !initial || !surname || !department || !email) {
        alert('Please fill in all fields.');
        return;
    }

    const teacherData = { TITLE: title, INITIAL: initial, SURNAME: surname, DEPARTMENT: department, EMAIL: email };

    try {
        const response = await fetch(`http://localhost:3000/teacher/${persal}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(teacherData),
        });

        if (response.status === 404) {
            
            await fetch('http://localhost:3000/teacher', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ PERSAL: persal, ...teacherData }),
            });
        }

        fetchTeachers(); 
        resetTeacherForm();
    } catch (error) {
        console.error('Fetch error:', error);
        alert(`An error occurred while saving data: ${error.message}`);
    }
}


async function deleteTeacher(persal) {
    if (!confirm('Are you sure you want to delete this teacher?')) return;

    try {
        await fetch(`http://localhost:3000/teacher/${persal}`, {
            method: 'DELETE',
        });
        fetchTeachers(); 
    } catch (error) {
        console.error('Fetch error:', error);
        alert(`An error occurred while deleting data: ${error.message}`);
    }
}


function startEditingTeacher(persal) {
    const teacher = teachers.find(t => t.PERSAL === persal);

    if (teacher) {
        document.getElementById('teacher-persal').value = teacher.PERSAL;
        document.getElementById('teacher-title').value = teacher.TITLE;
        document.getElementById('teacher-initial').value = teacher.INITIAL;
        document.getElementById('teacher-surname').value = teacher.SURNAME;
        document.getElementById('teacher-department').value = teacher.DEPARTMENT;
        document.getElementById('teacher-email').value = teacher.EMAIL;
    }
}


function updateTeacherTable() {
    const tableBody = document.getElementById('teachers-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';

    teachers.forEach((teacher) => {
        const row = tableBody.insertRow();
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


function resetTeacherForm() {
    document.getElementById('teacher-form').reset();
    document.getElementById('teacher-persal').focus();
}

app.use(cors());

async function searchTeacher(event) {
    event.preventDefault();

    const persal = document.getElementById('search-teacher-persal').value.trim();
    if (!persal) return alert('Please enter a Teacher Persal number.');

    try {
        const response = await fetch(`http://localhost:3000/teacher/${persal}`);
        if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
        const teacher = await response.json();
        teachers = [teacher];
        updateTeacherTable();
    } catch (error) {
        console.error('Fetch error:', error);
        alert(`Teacher not found or an error occurred: ${error.message}`);
    }
}
