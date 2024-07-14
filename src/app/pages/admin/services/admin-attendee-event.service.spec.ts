import { TestBed } from '@angular/core/testing';

import { AdminAttendeeEventService } from './admin-attendee-event.service';

describe('AdminAttendeeEventService', () => {
  let service: AdminAttendeeEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminAttendeeEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
