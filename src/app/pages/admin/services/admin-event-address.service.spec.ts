import { TestBed } from '@angular/core/testing';

import { AdminEventAddressService } from './admin-event-address.service';

describe('AdminEventAddressService', () => {
  let service: AdminEventAddressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEventAddressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
