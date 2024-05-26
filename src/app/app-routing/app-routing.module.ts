import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestsComponent} from "../components/tests/tests.component";
import {DashboardCoursesComponent} from "../components/courses/dashboard-courses.component";
import {DocumentationComponent} from "../components/documentation/documentation.component";
import {GradesComponent} from "../components/grades/grades.component";
import {DashboardHomeComponent} from "../components/dashboard-home/dashboard-home.component";
import {TestViewComponent} from "../components/test-view/test-view.component";
import {ProfileComponent} from "../components/profile/profile.component";

export const routes: Routes = [
    // redirects
    {path: '', redirectTo: '/dashboard/home', pathMatch: 'full'},
    {path: 'home', redirectTo: '/dashboard/home', pathMatch: 'full'},
    {path: 'dashboard', redirectTo: '/dashboard/home', pathMatch: 'full'},

    // STUDENT
    {path: 'dashboard/tests', component: TestsComponent},
    {path: 'dashboard/courses', component: DashboardCoursesComponent},
    {path: 'dashboard/documentation', component: DocumentationComponent},
    {path: 'dashboard/grades', component: GradesComponent},
    {path: 'dashboard/home', component: DashboardHomeComponent},
    { path: 'test-view/:id', component: TestViewComponent },
    { path: 'dashboard/profile', component: ProfileComponent },  // Add the route for the Profile component


    // PROFESSOR
    {path: 'admin/tests', component: TestsComponent},
    {path: 'admin/courses', component: DashboardCoursesComponent},
    {path: 'admin/documentation', component: DocumentationComponent},
    {path: 'admin/grades', component: GradesComponent},
    {path: 'admin/home', component: DashboardHomeComponent},
];

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
