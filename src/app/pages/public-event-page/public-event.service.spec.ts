import { TestBed } from '@angular/core/testing';

import { PublicEventService } from './public-event.service';

describe('PublicEventService', () => {
  let service: PublicEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PublicEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
