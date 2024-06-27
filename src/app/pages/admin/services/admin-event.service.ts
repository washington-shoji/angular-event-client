import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEvent } from '../../public-event-page/event.type';

@Injectable()
export class AdminEventService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:3000/api/v1/events';

  createEvents(payload: AppEvent): Observable<AppEvent> {
    return this.http.post<AppEvent>(this.URL, payload);
  }

  getEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(this.URL);
  }
}
