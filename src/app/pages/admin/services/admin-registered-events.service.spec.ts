import { TestBed } from '@angular/core/testing';

import { AdminRegisteredEventsService } from './admin-registered-events.service';

describe('AdminRegisteredEventsService', () => {
  let service: AdminRegisteredEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRegisteredEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
