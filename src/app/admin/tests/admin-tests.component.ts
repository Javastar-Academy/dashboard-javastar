import { Component, OnInit } from '@angular/core';
import { TestsService } from '../../services/test.service';
import { CourseService } from '../../services/course.service';
import { AdminQuestion, WeeklyTest, Answer } from "../../models/Test";

@Component({
  selector: 'app-admin-tests',
  templateUrl: './admin-tests.component.html',
  styleUrls: ['./admin-tests.component.css']
})
export class AdminTestsComponent implements OnInit {
  questions: AdminQuestion[] = [];
  filteredQuestions: AdminQuestion[] = [];
  weeklyTests: WeeklyTest[] = [];
  selectedQuestion: AdminQuestion | null = null;
  newQuestion: Partial<AdminQuestion> & { answers: Answer[], correctAnswerIndex?: number } = {
    answers: [
      { correctAnswer: false, answerText: '' },
      { correctAnswer: false, answerText: '' },
      { correctAnswer: false, answerText: '' },
      { correctAnswer: false, answerText: '' }
    ]
  };
  newWeeklyTest: Partial<WeeklyTest> = {};
  currentCourse: string;
  searchQuery: string = '';
  availableWeeks: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Example weeks

  constructor(private testsService: TestsService, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.currentCourse$.subscribe(courseName => {
      this.currentCourse = courseName;
      if (this.currentCourse !== undefined) {
        this.loadQuestions(this.currentCourse);
        this.loadWeeklyTests(this.currentCourse);
      }
    });
  }

  loadQuestions(courseId: string): void {
    this.testsService.getQuestions().subscribe({
      next: questions => {
        this.questions = questions;
        this.filterAndSortQuestions();
      },
      error: err => console.error('Failed to load questions', err)
    });
  }

  loadWeeklyTests(courseId: string): void {
    this.testsService.getWeeklyTests(courseId).subscribe({
      next: weeklyTests => this.weeklyTests = weeklyTests,
      error: err => console.error('Failed to load weekly tests', err)
    });
  }

  filterAndSortQuestions(): void {
    this.filteredQuestions = this.questions.filter(question =>
      question.question.toLowerCase().includes(this.searchQuery.toLowerCase())
    ).sort((a, b) => a.weekNumber - b.weekNumber);
  }

  uploadQuestion(): void {
    if (this.newQuestion) {
      const question = { ...this.newQuestion, courseId: this.currentCourse } as AdminQuestion;
      question.answers.forEach((answer, index) => {
        answer.correctAnswer = index === this.newQuestion.correctAnswerIndex;
      });
      this.testsService.addQuestion(question).subscribe({
        next: () => {
          this.loadQuestions(this.currentCourse);
          this.newQuestion = {
            answers: [
              { correctAnswer: false, answerText: '' },
              { correctAnswer: false, answerText: '' },
              { correctAnswer: false, answerText: '' },
              { correctAnswer: false, answerText: '' }
            ]
          };
        },
        error: err => console.error('Failed to add question', err)
      });
    }
  }

  isCorrectAnswerSelected(): boolean {
    return this.newQuestion.answers.some(answer => answer.correctAnswer);
  }

  activateQuestion(question: AdminQuestion): void {
    question.active = true;
    this.modifyQuestion(question);
  }

  deactivateQuestion(question: AdminQuestion): void {
    question.active = false;
    this.modifyQuestion(question);
  }

  deleteQuestion(question: AdminQuestion): void {
    this.testsService.deleteQuestion(question.id).subscribe({
      next: () => this.loadQuestions(this.currentCourse),
      error: err => console.error('Failed to delete question', err)
    });
  }

  modifyQuestion(question: AdminQuestion): void {
    this.testsService.updateQuestion(question.id, question).subscribe({
      next: () => this.loadQuestions(this.currentCourse),
      error: err => console.error('Failed to update question', err)
    });
  }

  addWeeklyTest(): void {
    if (this.newWeeklyTest) {
      const weeklyTest = { ...this.newWeeklyTest, courseId: this.currentCourse } as WeeklyTest;
      this.testsService.addWeeklyTestMetadata([weeklyTest]).subscribe({
        next: () => {
          this.loadWeeklyTests(this.currentCourse);
          this.newWeeklyTest = {};
        },
        error: err => console.error('Failed to add weekly test', err)
      });
    }
  }

  editWeeklyTest(weeklyTest: WeeklyTest): void {
    weeklyTest.editing = true;
  }

  updateWeeklyTest(weeklyTest: WeeklyTest): void {
    this.testsService.updateWeeklyTest(weeklyTest.id, weeklyTest).subscribe({
      next: () => {
        weeklyTest.editing = false;
        this.loadWeeklyTests(this.currentCourse);
      },
      error: err => console.error('Failed to update weekly test', err)
    });
  }

  cancelEdit(weeklyTest: WeeklyTest): void {
    weeklyTest.editing = false;
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.filterAndSortQuestions();
  }

  selectWeek(week: number): void {
    this.newQuestion.weekNumber = week;
  }

  toggleQuestions(weeklyTest: WeeklyTest): void {
    weeklyTest.showQuestions = !weeklyTest.showQuestions;
  }

  randomizeQuestions(weeklyTest: WeeklyTest): void {
    console.log(`Randomizing questions for ${weeklyTest.name}`);
  }
}
