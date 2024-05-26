import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardCoursesComponent} from './dashboard-courses.component';

describe('CoursesComponent', () => {
    let component: DashboardCoursesComponent;
    let fixture: ComponentFixture<DashboardCoursesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardCoursesComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(DashboardCoursesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
