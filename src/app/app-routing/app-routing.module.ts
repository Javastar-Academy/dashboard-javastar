import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TestsComponent} from "../components/tests/tests.component";
import {DashboardCoursesComponent} from "../components/courses/dashboard-courses.component";
import {DocumentationComponent} from "../components/documentation/documentation.component";
import {GradesComponent} from "../components/grades/grades.component";
import {DashboardHomeComponent} from "../components/dashboard-home/dashboard-home.component";
import {TestViewComponent} from "../components/test-view/test-view.component";
import {ProfileComponent} from "../components/profile/profile.component";
import {AdminHomeworkComponent} from "../admin/homework/admin-homework.component";
import {AdminAnalyticsComponent} from "../admin/analytics/admin-analytics.component";
import {AdminTestsComponent} from "../admin/tests/admin-tests.component";
import {AdminGradesComponent} from "../admin/grades/admin-grades.component";
import {AdminCoursesComponent} from "../admin/courses/admin-courses.component";
import {AdminDocumentationComponent} from "../admin/documentation/admin-documentation.component";

export const routes: Routes = [
    // redirects
    {path: '', redirectTo: '/dashboard/home', pathMatch: 'full'},
    {path: 'home', redirectTo: '/dashboard/home', pathMatch: 'full'},
    {path: 'dashboard', redirectTo: '/dashboard/home', pathMatch: 'full'},
    {path: 'admin', redirectTo: '/admin/analytics', pathMatch: 'full'},

    // STUDENT
    {path: 'dashboard/tests', component: TestsComponent},
    {path: 'dashboard/courses', component: DashboardCoursesComponent},
    {path: 'dashboard/documentation', component: DocumentationComponent},
    {path: 'dashboard/grades', component: GradesComponent},
    {path: 'dashboard/home', component: DashboardHomeComponent},
    { path: 'test-view/:id', component: TestViewComponent },
    { path: 'dashboard/profile', component: ProfileComponent },  // Add the route for the Profile component


    // PROFESSOR
  { path: 'admin/tests', component: AdminTestsComponent },
  { path: 'admin/grades', component: AdminGradesComponent },
  { path: 'admin/analytics', component: AdminAnalyticsComponent },
  { path: 'admin/courses', component: AdminCoursesComponent },
  { path: 'admin/documentation', component: AdminDocumentationComponent },
  // { path: 'admin/homework', component: AdminHomeworkComponent },
];

// configures NgModule imports and exports
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
