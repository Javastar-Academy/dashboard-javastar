import {Injectable} from '@angular/core';
import {Test, WeeklyTest} from "../models/Test";
import {environment} from "../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // get the list of tests for this course
  public getWeeklyTests(currentCourse: string): Observable<WeeklyTest[]> {
    const url = `${this.baseUrl}/dashboard/tests/course/${currentCourse}`;
    console.log(url)
    const headers = this.buildHeadersWithToken()
    return this.http.get<WeeklyTest[]>(url, { headers });
  }

  // get specific test with randomized questions
  public getTestByWeek(week: number, currentCourse: string): Observable<Test> {
    const url = `${this.baseUrl}/dashboard/tests/${week}/course/${currentCourse}`;
    const headers = this.buildHeadersWithToken()
    return this.http.get<Test>(url, { headers });
  }

  // will save the grade and answers in Attempt Entity and will be retrieved in the list of tests
  public submitTestAnswers(currentCourse: string, weekId: number, answers: { questionId: number, answer: string }[]): Observable<any> {
    const url = `${this.baseUrl}/dashboard/tests/${weekId}/submit/course/${currentCourse}`;
    const headers = this.buildHeadersWithToken();
    return this.http.post(url, answers, { headers });
  }

  public decrementAttempts(currentCourse: string, week: number): Observable<any>{
    const url = `${this.baseUrl}/dashboard/tests/${week}/decrementAttempts/course/${currentCourse}`;
    const headers = this.buildHeadersWithToken();
    return this.http.get(url, { headers });
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken') || '';
  }

  public getFirstname(): string {
    return localStorage.getItem('firstname') || '';
  }

  private buildHeadersWithToken() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
  }
}
