import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {CourseService} from "./services/course.service";
import {DashboardComponent} from "./components/dashboard.component";
import {TestsComponent} from "./components/tests/tests.component";
import {DocumentationComponent} from "./components/documentation/documentation.component";
import {GradesComponent} from "./components/grades/grades.component";
import {DashboardCoursesComponent} from "./components/courses/dashboard-courses.component";
import {DashboardHomeComponent} from "./components/dashboard-home/dashboard-home.component";
import {TestViewComponent} from "./components/test-view/test-view.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {DashboardFooterComponent} from "./components/dashboard-footer/dashboard-footer.component";
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {FormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [
    DashboardComponent,
    TestsComponent,
    DocumentationComponent,
    GradesComponent,
    DashboardCoursesComponent,
    DashboardHomeComponent,
    TestViewComponent,
    ProfileComponent,
    DashboardFooterComponent
  ],

  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ButtonModule,
    RippleModule,
  ],

  providers: [CourseService],
})

export class AppModule {

}
