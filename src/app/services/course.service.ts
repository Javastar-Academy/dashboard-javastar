import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, throwError} from "rxjs";
import {Pdf, Video} from "../models/Video";
import {environment} from "../environments/environment";
import {Course} from "../models/Course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private currentCourseSource = new BehaviorSubject<string>(localStorage.getItem('currentCourse')!);

  currentCourse$ = this.currentCourseSource.asObservable();
  private baseUrl: string = environment.baseUrl

  constructor(private httpClient: HttpClient) {
  }

  getCourseList(): Observable<Course[]> {
    const courseListUrl = `${this.baseUrl}/tova/allCourses`;
    const headers = this.buildHeadersWithToken();
    return this.httpClient.get<Course[]>(courseListUrl, {headers});
  }

  setCurrentCourse(courseName: string) {
    this.currentCourseSource.next(courseName);
  }

  clearCurrentCourse() {
    this.currentCourseSource.next('undefined');
  }

  getVideosByCourse(courseId: string): Observable<Video[]> {
    const headers = this.buildHeadersWithToken();
    return this.httpClient.get<Video[]>
    (`${this.baseUrl}/api/videos/course/${courseId}`, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  getPdfsByCourse(courseId: string): Observable<Pdf[]> {
    const headers = this.buildHeadersWithToken();
    return this.httpClient.get<Pdf[]>(`${this.baseUrl}/api/pdfs/course/${courseId}`, {headers});
  }


  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(error);
  }


  private buildHeadersWithToken() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
  }

  private getToken(): string {
    return localStorage.getItem('jwtToken') || '';
  }
}
