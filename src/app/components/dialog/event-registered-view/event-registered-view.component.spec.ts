import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRegisteredViewComponent } from './event-registered-view.component';

describe('EventRegisteredViewComponent', () => {
  let component: EventRegisteredViewComponent;
  let fixture: ComponentFixture<EventRegisteredViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventRegisteredViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventRegisteredViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
