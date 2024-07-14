import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventAttendee } from '../../../types/event-attendee';

@Injectable()
export class AdminAttendeeEventService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:3000/api/v1';

  createEventAttendee(
    eventId: string,
    payload: EventAttendee
  ): Observable<EventAttendee> {
    return this.http.post<EventAttendee>(
      `${this.URL}/event-attendee/event/${eventId}`,
      payload
    );
  }
}
