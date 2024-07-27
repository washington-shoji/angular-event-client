export interface EventAttendee {
  attendee_id: string;
  registration_name: string;
  attendee_status: ATTENDEE_STATUS;
}

export type ATTENDEE_STATUS = 'ATTENDING' | 'TENTATIVE' | 'NOT-ATTENDING';
