import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EventAddress } from '../../../types/event-address';

@Injectable()
export class AdminEventAddressService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:3000/api/v1';

  createEventAddress(
    eventId: string,
    payload: EventAddress
  ): Observable<EventAddress> {
    return this.http.post<EventAddress>(
      `${this.URL}/events-address/event/${eventId}`,
      payload
    );
  }

  updateEventAddress(
    id: string,
    eventId: string,
    payload: EventAddress
  ): Observable<EventAddress> {
    return this.http.put<EventAddress>(
      `${this.URL}/events-address/${id}/event/${eventId}`,
      payload
    );
  }

  deleteEventAddress(id: string, eventId: string): Observable<string> {
    return this.http.delete<string>(
      `${this.URL}/events-address/${id}/event/${eventId}`
    );
  }

  findEventAddressById(id: string, eventId: string): Observable<EventAddress> {
    return this.http.get<EventAddress>(
      `${this.URL}/events-address/${id}/event/${eventId}`
    );
  }

  findEventAddressByEventId(eventId: string): Observable<EventAddress> {
    return this.http.get<EventAddress>(
      `${this.URL}/events-address/event/${eventId}`
    );
  }
}
