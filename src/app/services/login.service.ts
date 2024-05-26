import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {TestsService} from "./test.service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    // Use the same API endpoint or adjust as necessary
    private loginUrl = environment.baseUrl + "/users/login";
    private isAuthenticated = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private testService: TestsService) {
        this.loadInitialAuthState();
    }

    private loadInitialAuthState() {
        const token = localStorage.getItem('userToken');
        this.isAuthenticated.next(!!token);
    }

    login(token: string): void {
        localStorage.setItem('jwtToken', token);
        this.getUserAndSaveToLocalstorage()
        this.isAuthenticated.next(true);
    }

    logout(): void {
        localStorage.removeItem('userToken');
        this.isAuthenticated.next(false);
    }

    isLoggedIn(): Observable<boolean> {
        return this.isAuthenticated.asObservable();
    }

    authenticate(userData: { password: string; username: string }) {
        return this.http.post<{ token: string }>(this.loginUrl, userData).pipe(
            tap(response => {
                localStorage.setItem('jwtToken', response.token);
                this.getUserAndSaveToLocalstorage()
                this.isAuthenticated.next(true);
            })
        );

    }

    private getUserAndSaveToLocalstorage() {
        const token = this.testService.getToken()
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });

        const url = environment.baseUrl + "/users/get";

        this.http.get<any>(url, { headers }).pipe(
            tap(user => {
                localStorage.setItem('firstName', user.firstName);
                localStorage.setItem('lastName', user.lastName);
                localStorage.setItem('email', user.email);
                localStorage.setItem('accountVerified', String(user.accountVerified));
                localStorage.setItem('phoneNumber', user.phoneNumber);
                localStorage.setItem('username', user.username);
                localStorage.setItem('role', user.role); // how you handle 'user.role' depends on its structure.
            })
        ).subscribe();
    }



    getUserRole(): string | null {
        return localStorage.getItem('userRole');
    }
}
