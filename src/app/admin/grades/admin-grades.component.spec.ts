import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGradesComponent } from './admin-grades.component';

describe('GradesComponent', () => {
  let component: AdminGradesComponent;
  let fixture: ComponentFixture<AdminGradesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGradesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
