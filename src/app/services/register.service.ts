import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    // Use the same API endpoint or adjust as necessary
    private registerUrl = environment.baseUrl + "/students/register";

    constructor(private http: HttpClient) { }

    registerUser(userData: any) {
        return this.http.post(this.registerUrl, userData);
    }
}
