import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Subscription } from 'rxjs';
import { GradesService } from "../../services/grades.service";
import { CourseService } from "../../services/course.service";
import { GradeItem, GradeType } from "../../models/GradeItem";

@Component({
    selector: 'app-grades',
    templateUrl: './grades.component.html',
    styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit, AfterViewInit, OnDestroy {
    tests: GradeItem[] = [];
    homeworks: GradeItem[] = [];
    finalProject: GradeItem | undefined;
    extraJobs: GradeItem[] = [];

    testsGrade: number = 0;
    homeworkGrade: number = 0;
    finalProjectGrade: number = 0;
    extraJobsGrade: number = 0;
    compositeGrade: number = 0;

    private courseSubscription: Subscription;
    private currentCourse: string;
    private chart: Chart | undefined;

    constructor(private gradesService: GradesService, private courseService: CourseService) {
        Chart.register(...registerables);
    }

    ngOnInit(): void {
        this.courseSubscription = this.courseService.currentCourse$.subscribe(
            course => {
                if (course !== undefined) {
                    this.currentCourse = course;
                    this.loadGrades(course);
                }
            },
            err => {
                console.error('Failed to get current course', err);
            }
        );
    }

    ngOnDestroy(): void {
        if (this.courseSubscription) {
            this.courseSubscription.unsubscribe();
        }
        if (this.chart) {
            this.chart.destroy();
        }
    }

    ngAfterViewInit(): void {
        this.renderChart();
    }

    loadGrades(courseId: string): void {
        this.gradesService.getAllGrades(courseId).subscribe({
            next: (tests) => {
                this.tests = tests.filter(grade => grade.type === GradeType.TEST);
                this.homeworks = tests.filter(grade => grade.type === GradeType.HOMEWORK);
                this.finalProject = tests.find(grade => grade.type === GradeType.FINAL_PROJECT);
                this.extraJobs = tests.filter(grade => grade.type === GradeType.EXTRA_JOB);

                this.testsGrade = this.calculateAverage(this.tests);
                this.homeworkGrade = this.calculateAverage(this.homeworks);
                this.finalProjectGrade = this.finalProject ? this.finalProject.grade : 0;
                this.extraJobsGrade = this.calculateAverage(this.extraJobs);
                this.calculateCompositeGrade();
                this.renderChart();
            },
            error: (err) => console.error('Failed to load tests grades', err)
        });
    }

    calculateAverage(items: GradeItem[]): number {
        if (items.length === 0) return 0;
        const total = items.reduce((sum, item) => sum + item.grade, 0);
        return total / items.length;
    }

    calculateCompositeGrade(): void {
        this.compositeGrade = (this.testsGrade + this.homeworkGrade + this.finalProjectGrade)/3
            + this.extraJobsGrade / 10;
    }

    renderChart(): void {
        const ctx = (document.getElementById('gradesChart') as HTMLCanvasElement).getContext('2d');
        if (ctx) {
            if (this.chart) {
                this.chart.destroy();
            }
            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['Tests', 'Homework', 'Final Project', 'Extra Jobs'],
                    datasets: [{
                        label: 'Grades',
                        data: [this.testsGrade, this.homeworkGrade, this.finalProjectGrade, this.extraJobsGrade],
                        backgroundColor: ['#ff6f61', '#6b5b95', '#88b04b', '#92a8d1']
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100
                        }
                    }
                }
            });
        }
    }
}
