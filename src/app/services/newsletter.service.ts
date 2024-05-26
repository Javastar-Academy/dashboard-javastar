
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NewsletterService {

    api = environment.baseUrl

    constructor(private http: HttpClient) { }

    subscribeToNewsletter(email: string){
        return this.http.post(`${this.api}/newsletter/subscribe`, {email});
    }
}
