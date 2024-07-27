import { AppEvent } from './event';
import { EventAddress } from './event-address';
import { EventAttendee } from './event-attendee';

export interface RegisteredEvent {
  attendee: EventAttendee;
  event: AppEvent;
  address: EventAddress;
}
