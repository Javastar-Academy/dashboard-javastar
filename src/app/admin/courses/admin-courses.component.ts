import { Component, OnInit, OnDestroy } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/Video';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {AwsService} from "../../services/s3-upload-service.service.spec";

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.css']
})
export class AdminCoursesComponent implements OnInit, OnDestroy {
  videos: Video[] = [];
  selectedCourse: Video | null = null;
  newVideo: Partial<Video> = { title: '', description: '', url: '' };
  selectedFile: File | null = null;
  thumbnailFile: File | null = null;
  playingVideoUrl: string | null = null;

  private currentCourse: string;
  private courseSubscription: Subscription;

  constructor(
    private videoService: VideoService,
    private courseService: CourseService,
    private awsService: AwsService,
    private router: Router
  ) {}

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

  onFileSelected(event: any, type: string): void {
    if (type === 'video') {
      this.selectedFile = event.target.files[0];
    } else if (type === 'thumbnail') {
      this.thumbnailFile = event.target.files[0];
    }
  }

  uploadCourse(): void {
    if (this.selectedFile) {
      this.uploadFile(this.selectedFile)
        .then(videoUrl => {
          this.newVideo.url = videoUrl;
          this.newVideo.courseId = this.currentCourse;
          if (this.thumbnailFile) {
            return this.uploadFile(this.thumbnailFile).then(thumbnailUrl => {
              this.newVideo.thumbnail = thumbnailUrl;
              this.saveCourse();
            });
          } else {
            return this.saveCourse();
          }
        })
        .catch(error => console.error('Error uploading video:', error));
    } else {
      alert('Please select a video file first');
    }
  }

  uploadFile(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      this.awsService.uploadFile(file).subscribe(
        response => resolve(response),
        error => reject(error)
      );
    });
  }

  saveCourse(): void {
    this.videoService.uploadCourse(this.newVideo).subscribe(
      course => {
        this.videos.push(course);
        alert('Course uploaded successfully');
      },
      error => console.error('Error uploading course:', error)
    );
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
    this.getPresignedUrl(course.url);
  }

  getPresignedUrl(fileName: string): void {
    this.awsService.getPresignedUrl(fileName).subscribe(
      url => {
        console.log('Presigned URL:', url); // Debug log to check the URL
        this.playingVideoUrl = url;
      },
      error => {
        console.error('Error getting presigned URL:', error);
        this.playingVideoUrl = null;
      }
    );
  }


  editCourse(course: Video): void {
    this.newVideo = { ...course };
  }

  saveEditedCourse(): void {
    if (this.newVideo && this.selectedCourse) {
      this.videoService.modifyCourse({ ...this.selectedCourse, ...this.newVideo }).subscribe(
        () => {
          this.getCourses(this.currentCourse);
          this.selectedCourse = null;
          alert('Course updated successfully');
        },
        error => console.error('Error updating course:', error)
      );
    }
  }
}
