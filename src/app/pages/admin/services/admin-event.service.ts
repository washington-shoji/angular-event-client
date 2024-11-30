import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEvent } from '../../../types/event';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AdminEventService {
  constructor(private http: HttpClient) {}

  private URL: string = `${environment.apiUrl}/api/v1`;

  createEvents(payload: AppEvent): Observable<AppEvent> {
    return this.http.post<AppEvent>(`${this.URL}/events`, payload);
  }

  updateEvent(id: string, payload: AppEvent): Observable<AppEvent> {
    return this.http.put<AppEvent>(`${this.URL}/events/${id}`, payload);
  }

  getUserEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${this.URL}/user-events`);
  }

  deleteEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/events/${id}`);
  }
}
