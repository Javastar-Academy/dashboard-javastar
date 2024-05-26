import {Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import {CourseService} from "../../services/course.service";
import {Subscription} from 'rxjs';
import {Video} from "../../models/Video";
import {Router} from "@angular/router";

@Component({
    selector: 'app-courses',
    templateUrl: './dashboard-courses.component.html',
    styleUrls: ['./dashboard-courses.component.css']
})
export class DashboardCoursesComponent implements OnInit {
    @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

    videos: Video[] = [];
    selectedVideo: Video | null = null;
    playbackRate: number = 1.0;
    private currentCourse: string;
    private courseSubscription: Subscription;

    constructor(private courseService: CourseService, private router: Router) {
    }

    ngOnInit(): void {
        this.courseSubscription = this.courseService.currentCourse$.subscribe(
            course => {
                if (course !== undefined) {
                    this.currentCourse = course;
                    this.loadVideos(course);
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

    loadVideos(courseId: string) {
        this.courseService.getVideosByCourse(courseId).subscribe({
            next: (videos) => {
                this.videos = videos;
                if (this.videos.length > 0) {
                    this.selectedVideo = this.videos[0];
                } else {
                    this.selectedVideo = null
                }
            },
            error: (err) => {
                console.error('Failed to load videos', err);
                this.router.navigate(['/login']);
            }
        });
    }


    selectVideo(video: Video): void {
        this.selectedVideo = video;
        this.playbackRate = 1.0;
        if (this.videoPlayer) {
            this.videoPlayer.nativeElement.playbackRate = this.playbackRate;
        }
    }

    downloadPdf(url: string): void {
        window.open(url, '_blank');
    }
}
