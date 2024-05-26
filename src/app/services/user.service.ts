import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {environment} from "../environments/environment";
import {GradeItem} from "../models/GradeItem";

export interface UserProfile {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    accountVerified: boolean;
    phoneNumber: string;
    username: string;
    password: string;
    role: Role; // Assuming Role is another TypeScript interface or enum
    photoUrl: string;
}

export enum Role {
    ADMIN = 'ADMIN',
    PROFESSOR = 'PROFESSOR',
    STUDENT = 'STUDENT'
}

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private baseUrl = environment.baseUrl

    constructor(private http: HttpClient) {
    }

    private readonly userProfileUrl = `${this.baseUrl}/${"users"}/${"get"}`;

    getUserProfile(): Observable<UserProfile> {
        const headers = this.buildHeadersWithToken()
        return this.http.get<UserProfile>(this.userProfileUrl, {headers});
    };


    private buildHeadersWithToken() {
        return new HttpHeaders({
            'Authorization': `Bearer ${this.getToken()}`,
            'Content-Type': 'application/json'
        });
    }

    private getToken(): string {
        return localStorage.getItem('jwtToken') || '';
    }

    updateUserProfile(profile: UserProfile): Observable<void> {
        return this.http.put<void>(this.userProfileUrl, profile);
    }

}
