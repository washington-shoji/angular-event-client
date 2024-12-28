import { AppEvent } from './event';
import { EventAddress } from './event-address';

export interface AppEventRequest {
  eventModel: AppEvent;
  eventAddressModel: EventAddress;
}
