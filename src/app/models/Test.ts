// test.model.ts
export interface Question {
    id: number;
    question: string;
    answers: string[];
}

export interface Test {
    id: number;
    questions: Question[]
    timeInMinutes: number
}

export interface WeeklyTest {
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
