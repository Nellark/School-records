document.addEventListener('DOMContentLoaded', () => {
    const learnerForm = document.getElementById('learner-form');
    const searchLearnerForm = document.getElementById('search-learner-form');
    const fetchLearnersButton = document.getElementById('fetch-learners');
    const learnersTable = document.getElementById('learners-table').getElementsByTagName('tbody')[0];
    
    const teacherForm = document.getElementById('teacher-form');
    const searchTeacherForm = document.getElementById('search-teacher-form');
    const fetchTeachersButton = document.getElementById('fetch-teachers');
    const teachersTable = document.getElementById('teachers-table').getElementsByTagName('tbody')[0];

    // Function to fetch all learners and populate the table
    const fetchAllLearners = async () => {
        try {
            const response = await fetch('/learners');
            const learners = await response.json();
            learnersTable.innerHTML = '';
            learners.forEach(learner => {
                const row = learnersTable.insertRow();
                row.innerHTML = `
                    <td>${learner.ID}</td>
                    <td>${learner.NAME}</td>
                    <td>${learner.SURNAME}</td>
                    <td>${learner.GRADE}</td>
                    <td>${learner.CLASS}</td>
                    <td>
                        <button onclick="deleteLearner(${learner.ID})">Delete</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error('Error fetching learners:', error);
        }
    };

    // Function to fetch all teachers and populate the table
    const fetchAllTeachers = async () => {
        try {
            const response = await fetch('/teachers');
            const teachers = await response.json();
            teachersTable.innerHTML = '';
            teachers.forEach(teacher => {
                const row = teachersTable.insertRow();
                row.innerHTML = `
                    <td>${teacher.PERSAL}</td>
                    <td>${teacher.TITLE}</td>
                    <td>${teacher.INITIAL}</td>
                    <td>${teacher.SURNAME}</td>
                    <td>${teacher.DEPARTMENT}</td>
                    <td>${teacher.EMAIL}</td>
                    <td>${teacher.QUALIFICATION}</td>
                    <td>${teacher.StartDate}</td>
                    <td>
                        <button onclick="deleteTeacher('${teacher.PERSAL}')">Delete</button>
                    </td>
                `;
            });
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    // Function to handle learner form submission
    learnerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('learner-id').value;
        const name = document.getElementById('learner-name').value;
        const surname = document.getElementById('learner-surname').value;
        const grade = document.getElementById('learner-grade').value;
        const className = document.getElementById('learner-class').value;

        const method = id ? 'PUT' : 'POST';
        const url = id ? `/learners/${id}` : '/learners';
        const body = JSON.stringify({ NAME: name, SURNAME: surname, GRADE: grade, CLASS: className });

        try {
            await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body });
            fetchAllLearners();
            learnerForm.reset();
        } catch (error) {
            console.error('Error saving learner:', error);
        }
    });

    // Function to handle teacher form submission
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

        const method = persal ? 'PUT' : 'POST';
        const url = persal ? `/teachers/${persal}` : '/teachers';
        const body = JSON.stringify({ PERSAL: persal, TITLE: title, INITIAL: initial, SURNAME: surname, DEPARTMENT: department, EMAIL: email, QUALIFICATION: qualification, StartDate: startDate });

        try {
            await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body });
            fetchAllTeachers();
            teacherForm.reset();
        } catch (error) {
            console.error('Error saving teacher:', error);
        }
    });

    // Function to search for a learner by ID
    searchLearnerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = document.getElementById('search-learner-id').value;
        if (!id) return;

        try {
            const response = await fetch(`/learners/${id}`);
            const learner = await response.json();
            learnersTable.innerHTML = '';
            const row = learnersTable.insertRow();
            row.innerHTML = `
                <td>${learner.ID}</td>
                <td>${learner.NAME}</td>
                <td>${learner.SURNAME}</td>
                <td>${learner.GRADE}</td>
                <td>${learner.CLASS}</td>
                <td>
                    <button onclick="deleteLearner(${learner.ID})">Delete</button>
                </td>
            `;
        } catch (error) {
            console.error('Error searching for learner:', error);
        }
    });

    // Function to search for a teacher by Persal
    searchTeacherForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const persal = document.getElementById('search-teacher-persal').value;
        if (!persal) return;

        try {
            const response = await fetch(`/teachers/${persal}`);
            const teacher = await response.json();
            teachersTable.innerHTML = '';
            const row = teachersTable.insertRow();
            row.innerHTML = `
                <td>${teacher.PERSAL}</td>
                <td>${teacher.TITLE}</td>
                <td>${teacher.INITIAL}</td>
                <td>${teacher.SURNAME}</td>
                <td>${teacher.DEPARTMENT}</td>
                <td>${teacher.EMAIL}</td>
                <td>${teacher.QUALIFICATION}</td>
                <td>${teacher.StartDate}</td>
                <td>
                    <button onclick="deleteTeacher('${teacher.PERSAL}')">Delete</button>
                </td>
            `;
        } catch (error) {
            console.error('Error searching for teacher:', error);
        }
    });

    // Function to delete a learner
    window.deleteLearner = async (id) => {
        if (!confirm('Are you sure you want to delete this learner?')) return;

        try {
            await fetch(`/learners/${id}`, { method: 'DELETE' });
            fetchAllLearners();
        } catch (error) {
            console.error('Error deleting learner:', error);
        }
    };

    // Function to delete a teacher
    window.deleteTeacher = async (persal) => {
        if (!confirm('Are you sure you want to delete this teacher?')) return;

        try {
            await fetch(`/teachers/${persal}`, { method: 'DELETE' });
            fetchAllTeachers();
        } catch (error) {
            console.error('Error deleting teacher:', error);
        }
    };

    // Initial data fetch
    fetchAllLearners();
    fetchAllTeachers();
});
