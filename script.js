document.addEventListener('DOMContentLoaded', () => {
    const apiBase = 'http://localhost:3000'; // Adjust based on your server's URL

    const learnerForm = document.getElementById('learner-form');
    const teacherForm = document.getElementById('teacher-form');

    const loadLearners = async () => {
        try {
            const response = await fetch(`${apiBase}/learners`);
            const learners = await response.json();
            const list = document.getElementById('learners-list');
            list.innerHTML = learners.map(learner => 
                `<div>
                    <p><strong>ID:</strong> ${learner.ID} <strong>Name:</strong> ${learner.NAME} <strong>Surname:</strong> ${learner.SURNAME} <strong>Grade:</strong> ${learner.GRADE} <strong>Class:</strong> ${learner.CLASS}</p>
                    <button class="edit" onclick="editLearner(${learner.ID}, '${learner.NAME}', '${learner.SURNAME}', ${learner.GRADE}, '${learner.CLASS}')">Edit</button>
                    <button class="delete" onclick="deleteLearner(${learner.ID})">Delete</button>
                </div>`
            ).join('');
        } catch (err) {
            console.error('Error loading learners:', err);
        }
    };

    const loadTeachers = async () => {
        try {
            const response = await fetch(`${apiBase}/teachers`);
            const teachers = await response.json();
            const list = document.getElementById('teachers-list');
            list.innerHTML = teachers.map(teacher => 
                `<div>
                    <p><strong>Persal:</strong> ${teacher.PERSAL} <strong>Title:</strong> ${teacher.TITLE} <strong>Initial:</strong> ${teacher.INITIAL} <strong>Surname:</strong> ${teacher.SURNAME} <strong>Department:</strong> ${teacher.DEPARTMENT} <strong>Email:</strong> ${teacher.EMAIL} <strong>Qualification:</strong> ${teacher.QUALIFICATION} <strong>Start Date:</strong> ${teacher.StartDate}</p>
                    <button class="edit" onclick="editTeacher(${teacher.PERSAL}, '${teacher.TITLE}', '${teacher.INITIAL}', '${teacher.SURNAME}', '${teacher.DEPARTMENT}', '${teacher.EMAIL}', '${teacher.QUALIFICATION}', '${teacher.StartDate}')">Edit</button>
                    <button class="delete" onclick="deleteTeacher(${teacher.PERSAL})">Delete</button>
                </div>`
            ).join('');
        } catch (err) {
            console.error('Error loading teachers:', err);
        }
    };

    const editLearner = (id, name, surname, grade, className) => {
        document.getElementById('learner-id').value = id;
        document.getElementById('learner-name').value = name;
        document.getElementById('learner-surname').value = surname;
        document.getElementById('learner-grade').value = grade;
        document.getElementById('learner-class').value = className;
    };

    const editTeacher = (persal, title, initial, surname, department, email, qualification, startDate) => {
        document.getElementById('teacher-persal').value = persal;
        document.getElementById('teacher-title').value = title;
        document.getElementById('teacher-initial').value = initial;
        document.getElementById('teacher-surname').value = surname;
        document.getElementById('teacher-department').value = department;
        document.getElementById('teacher-email').value = email;
        document.getElementById('teacher-qualification').value = qualification;
        document.getElementById('teacher-startdate').value = startDate;
    };

    const deleteLearner = async (id) => {
        if (confirm('Are you sure you want to delete this learner?')) {
            try {
                const response = await fetch(`${apiBase}/learners/${id}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Learner deleted successfully');
                    loadLearners();
                } else {
                    alert('Error deleting learner');
                }
            } catch (err) {
                console.error('Error deleting learner:', err);
            }
        }
    };

    const deleteTeacher = async (persal) => {
        if (confirm('Are you sure you want to delete this teacher?')) {
            try {
                const response = await fetch(`${apiBase}/teachers/${persal}`, {
                    method: 'DELETE'
                });
                if (response.ok) {
                    alert('Teacher deleted successfully');
                    loadTeachers();
                } else {
                    alert('Error deleting teacher');
                }
            } catch (err) {
                console.error('Error deleting teacher:', err);
            }
        }
    };

    learnerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('learner-id').value;
        const name = document.getElementById('learner-name').value;
        const surname = document.getElementById('learner-surname').value;
        const grade = document.getElementById('learner-grade').value;
        const className = document.getElementById('learner-class').value;

        try {
            if (id) {
                await fetch(`${apiBase}/learners/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ NAME: name, SURNAME: surname, GRADE: grade, CLASS: className })
                });
                alert('Learner updated successfully');
            } else {
                await fetch(`${apiBase}/learners`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ NAME: name, SURNAME: surname, GRADE: grade, CLASS: className })
                });
                alert('Learner added successfully');
            }
            learnerForm.reset();
            loadLearners();
        } catch (err) {
            console.error('Error saving learner:', err);
        }
    });

    teacherForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const persal = document.getElementById('teacher-persal').value;
        const title = document.getElementById('teacher-title').value;
        const initial = document.getElementById('teacher-initial').value;
        const surname = document.getElementById('teacher-surname').value;
        const department = document.getElementById('teacher-department').value;
        const email = document.getElementById('teacher-email').value;
        const qualification = document.getElementById('teacher-qualification').value;
        const startDate = document.getElementById('teacher-startdate').value;

        try {
            if (persal) {
                await fetch(`${apiBase}/teachers/${persal}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ TITLE: title, INITIAL: initial, SURNAME: surname, DEPARTMENT: department, EMAIL: email, QUALIFICATION: qualification, StartDate: startDate })
                });
                alert('Teacher updated successfully');
            } else {
                await fetch(`${apiBase}/teachers`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ PERSAL: persal, TITLE: title, INITIAL: initial, SURNAME: surname, DEPARTMENT: department, EMAIL: email, QUALIFICATION: qualification, StartDate: startDate })
                });
                alert('Teacher added successfully');
            }
            teacherForm.reset();
            loadTeachers();
        } catch (err) {
            console.error('Error saving teacher:', err);
        }
    });

    loadLearners();
    loadTeachers();
});
