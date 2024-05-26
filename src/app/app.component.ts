import {Component, OnInit} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {LoginService} from "./services/login.service";
import {jwtDecode} from "jwt-decode";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected property name
})
export class AppComponent implements OnInit {
  title = 'dashboard-javastar';
  constructor(private authService: LoginService, private router: Router) {}

  ngOnInit(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      const decodedToken = jwtDecode<any>(token); // Use jwtDecode to parse the token
      const coursesString = decodedToken.courses;
      const role = decodedToken.role;

      localStorage.setItem('jwtToken', token); // Save the token to local storage
      localStorage.setItem('role', role);   // Set user role to local storage

      this.saveCourseToStorage(coursesString);

    }
  }


  private saveCourseToStorage(coursesString: string) {
      let coursesArray: number[]
      try {
        const parsed = JSON.parse(`[${coursesString}]`);
        coursesArray = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        coursesArray = [Number(coursesString)];
      }

      localStorage.setItem('courses', String(coursesArray));   // Set user role to local storage
      console.log('set courses array - courses:' + String(coursesArray))
      localStorage.setItem('currentCourse', String(coursesArray[0]))
      console.log('set current course - currentCourse:' + String(coursesArray[0]))
    }



  }
