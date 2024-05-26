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
    selector: 'admin-app-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

    profile: UserProfile | undefined;
    menuOpen = false;
    headerLogoHidden = false;

    faHome = faHome;
    faInbox = faInbox;

    courses: string[] = [];
    currentCourse: string;

    faCog = faCog;
    menuItems = [
        { name: 'Analytics', icon: faTachometerAlt, active: true, href: "/admin/analytics" },
        { name: 'Teste', icon: faTasks, active: false, href: "/admin/tests" },
        { name: 'Cursuri', icon: faBookOpen, active: false, href: "/admin/courses" },
        { name: 'Materiale', icon: faFileAlt, active: false, href: "/admin/documentation" },
        { name: 'Note', icon: faStar, active: false, href: "/admin/grades" },
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
