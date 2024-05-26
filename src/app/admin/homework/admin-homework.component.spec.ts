import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHomeworkComponent } from './admin-homework.component';

describe('HomeworkComponent', () => {
  let component: AdminHomeworkComponent;
  let fixture: ComponentFixture<AdminHomeworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHomeworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHomeworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
