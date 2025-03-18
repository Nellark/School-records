import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Learner {
  id: string;
  name: string;
  surname: string;
  grade: string;
  class: string;
}

interface Teacher {
  persal: string;
  title: string;
  initial: string;
  surname: string;
  department: string;
  email: string;
  qualification: string;
  startDate: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
displayLearners() {
throw new Error('Method not implemented.');
}
displayTeachers() {
throw new Error('Method not implemented.');
}
  learners: Learner[] = [];
  teachers: Teacher[] = [];
  
  learnerFormData: Learner = { id: '', name: '', surname: '', grade: '', class: '' };
  teacherFormData: Teacher = { 
    persal: '', title: '', initial: '', surname: '', department: '', 
    email: '', qualification: '', startDate: '' 
  };

  teacherPersal: string = ''; // For teacher search by persal
  filteredTeachers: Teacher[] = []; // For displaying filtered teacher data
  currentDate: string = new Date().toISOString().split('T')[0]; // Set current date to disable future dates

  ngOnInit(): void {
    const storedLearners = localStorage.getItem('learners');
    const storedTeachers = localStorage.getItem('teachers');
    
    if (storedLearners) {
      this.learners = JSON.parse(storedLearners);
    }

    if (storedTeachers) {
      this.teachers = JSON.parse(storedTeachers);
      this.filteredTeachers = this.teachers; // Initially display all teachers
    }
  }

  // Add or update learner
  addOrUpdateLearner(learner: Learner) {
    const existingLearnerIndex = this.learners.findIndex(l => l.id === learner.id);
    if (existingLearnerIndex !== -1) {
      this.learners[existingLearnerIndex] = learner; // Update existing learner
    } else {
      this.learners = [...this.learners, learner]; // Add new learner
    }
    this.saveLearnersToLocalStorage(); // Save to localStorage
    this.clearLearnerForm();
  }

  // Add or update teacher
  addOrUpdateTeacher(teacher: Teacher) {
    const existingTeacherIndex = this.teachers.findIndex(t => t.persal === teacher.persal);
    if (existingTeacherIndex !== -1) {
      this.teachers[existingTeacherIndex] = teacher; // Update existing teacher
    } else {
      this.teachers = [...this.teachers, teacher]; // Add new teacher
    }
    this.saveTeachersToLocalStorage(); // Save to localStorage
    this.clearTeacherForm();
  }

  // Edit learner
  editLearner(learner: Learner) {
    this.learnerFormData = { ...learner }; // Load learner data into form
  }

  // Edit teacher
  editTeacher(teacher: Teacher) {
    this.teacherFormData = { ...teacher }; // Load teacher data into form
  }

  // Delete learner
  deleteLearner(id: string) {
    this.learners = this.learners.filter(learner => learner.id !== id);
    this.saveLearnersToLocalStorage(); // Save to localStorage
  }

  // Delete teacher
  deleteTeacher(persal: string) {
    this.teachers = this.teachers.filter(teacher => teacher.persal !== persal);
    this.saveTeachersToLocalStorage(); // Save to localStorage
  }

  // Save learners to localStorage
  saveLearnersToLocalStorage() {
    localStorage.setItem('learners', JSON.stringify(this.learners));
  }

  // Save teachers to localStorage
  saveTeachersToLocalStorage() {
    localStorage.setItem('teachers', JSON.stringify(this.teachers));
  }

  // Clear learner form
  clearLearnerForm() {
    this.learnerFormData = { id: '', name: '', surname: '', grade: '', class: '' };
  }

  // Clear teacher form
  clearTeacherForm() {
    this.teacherFormData = { persal: '', title: '', initial: '', surname: '', department: '', email: '', qualification: '', startDate: '' };
  }

  // Search teacher by Persal
  searchTeacher() {
    if (this.teacherPersal) {
      this.filteredTeachers = this.teachers.filter(teacher =>
        teacher.persal.includes(this.teacherPersal) // Filter by persal
      );
    } else {
      this.filteredTeachers = this.teachers; // Show all teachers if no search term
    }
  }
}
