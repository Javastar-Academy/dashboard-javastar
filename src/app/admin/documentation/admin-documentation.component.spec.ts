import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDocumentationComponent } from './admin-documentation.component';

describe('DocumentationComponent', () => {
  let component: AdminDocumentationComponent;
  let fixture: ComponentFixture<AdminDocumentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminDocumentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
