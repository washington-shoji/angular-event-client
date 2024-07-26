import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAttendingEventsComponent } from './admin-attending-events.component';

describe('AdminAttendingEventsComponent', () => {
  let component: AdminAttendingEventsComponent;
  let fixture: ComponentFixture<AdminAttendingEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAttendingEventsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAttendingEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
