import {Component, OnInit} from '@angular/core';
import {WeeklyTest} from "../../models/Test";
import {TestsService} from "../../services/test.service";
import {Router} from "@angular/router";
import {CourseService} from "../../services/course.service";

@Component({
    selector: 'app-tests',
    templateUrl: './tests.component.html',
    styleUrls: ['./tests.component.css']
})
export class TestsComponent implements OnInit {
    weeklyTests: WeeklyTest[];
    currentDate = new Date();
    private currentCourse: string;

    constructor(private testsService: TestsService, private router: Router, private courseService: CourseService) {
    }

    ngOnInit(): void {
        this.courseService.currentCourse$.subscribe(courseName => {
            this.currentCourse = courseName;
            if (this.currentCourse !== undefined) {
                this.loadWeeklyTests(this.currentCourse);
            }
        });
    }

    private loadWeeklyTests(currentCourse: string) {
        this.testsService.getWeeklyTests(currentCourse).subscribe({
            next: (tests) => {
                this.weeklyTests = tests.map(test => ({
                    ...test,
                    status: this.getWeekStatus(new Date(test.availableDate), new Date(test.endDate))
                })).sort((a, b) => new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime());
            },
            error: (err) => {
                console.error('Failed to load weekly tests:', err);
                this.router.navigate(['/login']);
            }
        });
    }

    getWeekStatus(testDate: Date, endDate: Date): string {
        const current = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
        const start = new Date(testDate.getFullYear(), testDate.getMonth(), testDate.getDate());
        const end = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

        if (end < current) {
            return 'past';
        } else if (start <= current && current < end) {
            return 'current';
        } else {
            return 'future';
        }
    }

    startTest(test: WeeklyTest): void {
        if (test.remainingAttempts > 0) {
            test.remainingAttempts--;
            this.testsService.decrementAttempts(this.currentCourse, test.week).subscribe(
                {
                    next: (response) => {
                        console.log("decremented attempt");
                        this.router.navigate(['/test-view', test.week]);
                    },
                    error: (error) => {
                        console.error('Failed to start test', error);
                    }
                }
            )
        } else {
            // Log an error message if no attempts are left
            console.error('No more attempts left for this test.');
        }
    }
}
