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
