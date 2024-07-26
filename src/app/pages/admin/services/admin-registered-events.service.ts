import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisteredEvent } from '../../../types/event-registered';

@Injectable()
export class AdminRegisteredEventsService {
  constructor(private http: HttpClient) {}

  private URL: string = 'http://localhost:3000/api/v1';

  getRegisteredEvents(): Observable<RegisteredEvent[]> {
    return this.http.get<RegisteredEvent[]>(`${this.URL}/registered-events`);
  }
}
