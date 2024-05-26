import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GradeItem} from "../models/GradeItem";
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GradesService {
    private baseUrl = environment.baseUrl+'/api/grades/course';

    constructor(private http: HttpClient) {
    }

    getAllGrades(courseId: string): Observable<GradeItem[]> {
        const headers = this.buildHeadersWithToken()
        return this.http.get<GradeItem[]>(`${this.baseUrl}/${courseId}`, {headers});
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

