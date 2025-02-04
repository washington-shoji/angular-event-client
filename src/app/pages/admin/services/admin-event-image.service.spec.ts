import { TestBed } from '@angular/core/testing';

import { AdminEventImageService } from './admin-event-image.service';

describe('AdminEventImageService', () => {
  let service: AdminEventImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEventImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
