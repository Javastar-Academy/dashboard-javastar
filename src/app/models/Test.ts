// test.model.ts
export interface Question {
    id: number;
    question: string;
    answers: string[];
    active: boolean;
    weekNumber: number;
}
export interface Test {
    id: number;
    questions: Question[]
    timeInMinutes: number
}

export interface WeeklyTest {
  editing: boolean;
  showQuestions: boolean;
    id: number;
    name: string;
    description: string;
    availableDate: string;
    endDate: string;
    status: any;
    week: number;
    remainingAttempts: number
    grade: number

}


export interface AdminQuestion {
  id: number;
  question: string;
  answers: Answer[];
  active: boolean;
  weekNumber: number;
}

export interface Answer {
  correctAnswer: boolean;
  answerText: string;
}
