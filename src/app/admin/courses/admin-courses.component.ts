import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/Video';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit, OnDestroy {
  videos: Video[] = [];
  selectedCourse: Video | null = null;

  private currentCourse: string;
  private courseSubscription: Subscription;
  selectedFile: File | null = null;

  constructor(private videoService: VideoService, private courseService: CourseService, private router: Router) {}

  ngOnInit(): void {
    this.courseSubscription = this.courseService.currentCourse$.subscribe(
      course => {
        if (course !== undefined) {
          this.currentCourse = course;
          this.getCourses(course);
        }
      },
      err => {
        console.error('Failed to get current course', err);
        this.router.navigate(['/login']);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.courseSubscription) {
      this.courseSubscription.unsubscribe();
    }
  }

  getCourses(courseId: string): void {
    this.videoService.getVideosByCourse(courseId).subscribe(
      courses => this.videos = courses,
      error => console.error('Error fetching courses:', error)
    );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  uploadCourse(): void {
    if (this.selectedFile) {
      const newCourse = {
        title: 'New Course',
        description: 'Course Description',
        instructor: 'Instructor Name'
      };
      this.videoService.uploadCourse(newCourse, this.selectedFile).subscribe(
        course => {
          this.videos.push(course);
          alert('Course uploaded successfully');
        },
        error => console.error('Error uploading course:', error)
      );
    } else {
      alert('Please select a file first');
    }
  }

  modifyCourse(): void {
    if (this.selectedCourse) {
      this.videoService.modifyCourse(this.selectedCourse).subscribe(
        () => {
          alert('Course modified successfully');
        },
        error => console.error('Error modifying course:', error)
      );
    }
  }

  deleteCourse(): void {
    if (this.selectedCourse) {
      this.videoService.deleteCourse(this.selectedCourse.url).subscribe(
        () => {
          this.videos = this.videos.filter(video => video.url !== this.selectedCourse?.url);
          this.selectedCourse = null;
          alert('Course deleted successfully');
        },
        error => console.error('Error deleting course:', error)
      );
    }
  }

  selectCourse(course: Video): void {
    this.selectedCourse = course;
  }

  editCourse(course: Video | null | undefined): void {
    // Logic to edit the selected course
    alert('Edit Course clicked');
  }
}
