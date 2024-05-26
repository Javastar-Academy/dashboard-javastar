export interface GradeItem {
    name: string;
    type: GradeType;
    grade: number;
}

export enum GradeType {
    TEST = 'TEST',
    HOMEWORK = 'HOMEWORK',
    FINAL_PROJECT = 'FINAL_PROJECT',
    EXTRA_JOB = 'EXTRA_JOB'
}
