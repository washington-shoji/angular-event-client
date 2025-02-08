import { AppEvent } from './event';
import { EventAddress } from './event-address';
import { EventAttendee } from './event-attendee';
import { EventImage } from './event-image';

export interface RegisteredEvent {
  attendee: EventAttendee;
  event: AppEvent;
  address: EventAddress;
  image?: EventImage;
}
