import {Component} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {CourseService} from "../../services/course.service";
import {Router} from "@angular/router";
import {Pdf} from "../../models/Video";
import {Subscription} from "rxjs";


@Component({
    selector: 'app-documentation',
    templateUrl: './documentation.component.html',
    styleUrls: ['./documentation.component.css']
})
export class DocumentationComponent {
    pdfs: Pdf[] = [];
    selectedPdf: Pdf | null = null;
    private currentCourse: string;
    private courseSubscription: Subscription;

    constructor(public sanitizer: DomSanitizer, private courseService: CourseService, private router: Router) {}

    ngOnInit(): void {
        this.courseSubscription = this.courseService.currentCourse$.subscribe(
            course => {
                if (course !== undefined) {
                    this.currentCourse = course;
                    this.loadPdfs(course);
                }
            },
            err => {
                console.error('Failed to get current course', err);
                this.router.navigate(['/login']);
            }
        );
    }

    ngOnDestroy() {
        if (this.courseSubscription) {
            this.courseSubscription.unsubscribe();
        }
    }

    loadPdfs(courseId: string) {
        this.courseService.getPdfsByCourse(courseId).subscribe({
            next: (pdfs) => {
                this.pdfs = pdfs;
                if (this.pdfs.length > 0) {
                    this.selectedPdf = this.pdfs[0];
                } else {
                    this.selectedPdf = null;
                }
            },
            error: (err) => {
                console.error('Failed to load PDFs', err);
                this.router.navigate(['/login']);
            }
        });
    }

    selectPdf(pdf: Pdf): void {
        this.selectedPdf = pdf;
    }

    downloadPdf(url: string): void {
        window.open(url, '_blank');
    }
}
