import { ATTENDEE_STATUS } from './event-attendee';

export interface AppEvent {
  event_id?: string;
  title: string;
  description: string;
  registration_open: string;
  registration_close: string;
  event_date: string;
  location_type: LOCATION_TYPE;
}

export type LOCATION_TYPE = 'VENUE' | 'ONLINE';

export interface AppRegisteredEvent extends AppEvent {
  attendee_status: ATTENDEE_STATUS;
}
