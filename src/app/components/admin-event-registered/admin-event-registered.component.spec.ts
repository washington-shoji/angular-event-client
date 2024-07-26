import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventRegisteredComponent } from './admin-event-registered.component';

describe('AdminEventRegisteredComponent', () => {
  let component: AdminEventRegisteredComponent;
  let fixture: ComponentFixture<AdminEventRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEventRegisteredComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEventRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
