import {Component, OnInit} from '@angular/core';
import {
    faBookOpen,
    faCog,
    faFileAlt,
    faHome,
    faInbox,
    faStar,
    faTachometerAlt,
    faTasks
} from '@fortawesome/free-solid-svg-icons';
import {UserProfile, UserService} from "../services/user.service";
import {Router} from "@angular/router";
import {TestsService} from '../services/test.service';
import {CourseService} from "../services/course.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    profile: UserProfile | undefined;
    menuOpen = false;
    headerLogoHidden = false;

    faHome = faHome;
    faInbox = faInbox;

    courses: string[] = [];
    currentCourse: string;

    faCog = faCog;
    menuItems = [
        { name: 'Dashboard', icon: faTachometerAlt, active: true, href: "/dashboard/home" },
        { name: 'Teste', icon: faTasks, active: false, href: "/dashboard/tests" },
        { name: 'Cursuri', icon: faBookOpen, active: false, href: "/dashboard/courses" },
        { name: 'Materiale', icon: faFileAlt, active: false, href: "/dashboard/documentation" },
        { name: 'Note', icon: faStar, active: false, href: "/dashboard/grades" },
    ];

    constructor(private userService: UserService, public router: Router, private courseService: CourseService) {
    }

    ngOnInit(): void {
        this.userService.getUserProfile().subscribe(profile => this.profile = profile);
        let coursesString = localStorage.getItem('courses')!;
        this.courses = coursesString.split(',');

        this.courseService.currentCourse$.subscribe(course => {
            this.currentCourse = course;
        });

    }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    setActive(item: any) {
        this.menuItems.forEach(mi => mi.active = false);
        item.active = true;
    }

    setCurrentCourse(event: Event) {
        const target = event.target as HTMLSelectElement;
        this.courseService.setCurrentCourse(target.value);
        localStorage.setItem('currentCourse', target.value);
        console.log(`Current course set to: ${target.value}`);
    }
}
