import { Injectable } from '@angular/core';
import {AdminQuestion, Question, Test, WeeklyTest} from "../models/Test";
import { environment } from "../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  // Get the list of tests for this course
  public getWeeklyTests(currentCourse: string): Observable<WeeklyTest[]> {
    const url = `${this.baseUrl}/dashboard/tests/course/${currentCourse}`;
    const headers = this.buildHeadersWithToken();
    return this.http.get<WeeklyTest[]>(url, { headers });
  }

  // Get specific test with randomized questions
  public getTestByWeek(week: number, currentCourse: string): Observable<Test> {
    const url = `${this.baseUrl}/dashboard/tests/${week}/course/${currentCourse}`;
    const headers = this.buildHeadersWithToken();
    return this.http.get<Test>(url, { headers });
  }

  // Save the grade and answers in Attempt Entity and will be retrieved in the list of tests
  public submitTestAnswers(currentCourse: string, weekId: number, answers: { questionId: number, answer: string }[]): Observable<any> {
    const url = `${this.baseUrl}/dashboard/tests/${weekId}/submit/course/${currentCourse}`;
    const headers = this.buildHeadersWithToken();
    return this.http.post(url, answers, { headers });
  }

  public decrementAttempts(currentCourse: string, week: number): Observable<any> {
    const url = `${this.baseUrl}/dashboard/tests/${week}/decrementAttempts/course/${currentCourse}`;
    const headers = this.buildHeadersWithToken();
    return this.http.get(url, { headers });
  }

  // Admin methods for managing questions

  // Add a new question
  public addQuestion(question: AdminQuestion): Observable<any> {
    const url = `${this.baseUrl}/dashboard/tests/admin/addQuestion`;
    const headers = this.buildHeadersWithToken();
    return this.http.post(url, question, { headers });
  }

  // Get all questions
  public getQuestions(): Observable<AdminQuestion[]> {
    const url = `${this.baseUrl}/dashboard/tests/admin/getQuestions`;
    const headers = this.buildHeadersWithToken();
    return this.http.get<AdminQuestion[]>(url, { headers });
  }

  // Update a question
  public updateQuestion(id: number, question: AdminQuestion): Observable<any> {
    const url = `${this.baseUrl}/dashboard/tests/admin/updateQuestion/${id}`;
    const headers = this.buildHeadersWithToken();
    return this.http.put(url, question, { headers });
  }

  // Delete a question
  public deleteQuestion(id: number): Observable<any> {
    const url = `${this.baseUrl}/dashboard/tests/admin/deleteQuestion/${id}`;
    const headers = this.buildHeadersWithToken();
    return this.http.delete(url, { headers });
  }

  // Add weekly test metadata
  public addWeeklyTestMetadata(tests: WeeklyTest[]): Observable<any> {
    const url = `${this.baseUrl}/dashboard/tests/admin/addWeeklyTestMetadata`;
    const headers = this.buildHeadersWithToken();
    return this.http.post(url, tests, { headers });
  }

  // update metadata
  public updateWeeklyTest(id: number, weeklyTest: WeeklyTest) {
    const url = `${this.baseUrl}/dashboard/tests/admin/updateWeeklyTestMetadata/${id}`;
    const headers = this.buildHeadersWithToken();
    return this.http.post(url, weeklyTest, { headers });

  }
  // Helper methods

  public getToken(): string {
    return localStorage.getItem('jwtToken') || '';
  }

  private buildHeadersWithToken() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
  }
}
