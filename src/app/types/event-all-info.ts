import { AppEvent } from './event';
import { EventAddress } from './event-address';
import { EventImage } from './event-image';

export interface AppEventRequest {
  eventModel: AppEvent;
  eventAddressModel: EventAddress;
  eventImageModel?: EventImage;
}
