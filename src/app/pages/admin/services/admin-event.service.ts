import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEvent } from '../../../types/event';
import { environment } from '../../../../environments/environment';
import { AppEventRequest } from '../../../types/event-all-info';

@Injectable()
export class AdminEventService {
  constructor(private http: HttpClient) {}

  private URL: string = `${environment.apiUrl}/api/v1`;

  createEvents(payload: AppEventRequest): Observable<AppEventRequest> {
    return this.http.post<AppEventRequest>(
      `${this.URL}/event-all-info`,
      payload
    );
  }

  updateEvent(id: string, payload: AppEvent): Observable<AppEvent> {
    return this.http.put<AppEvent>(`${this.URL}/events/${id}`, payload);
  }

  getUserEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${this.URL}/user-events`);
  }

  getUserEventsAllInfo(): Observable<AppEventRequest[]> {
    return this.http.get<AppEventRequest[]>(`${this.URL}/user-events`);
  }

  getUserEventAllInfoById(id: string): Observable<AppEventRequest> {
    return this.http.get<AppEventRequest>(`${this.URL}/event-all-info/${id}`);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/events/${id}`);
  }
}
