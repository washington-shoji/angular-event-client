import { AppEvent } from './event';
import { EventAddress } from './event-address';
import { EventImageModel } from './event-image';

export interface AppEventRequest {
  eventModel: AppEvent;
  eventAddressModel: EventAddress;
  eventImageModel?: EventImageModel;
}
