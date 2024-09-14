import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisteredEvent } from '../../../types/event-registered';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AdminRegisteredEventsService {
  constructor(private http: HttpClient) {}

  private URL: string = `${environment.apiUrl}/api/v1`;

  getRegisteredEvents(): Observable<RegisteredEvent[]> {
    return this.http.get<RegisteredEvent[]>(`${this.URL}/registered-events`);
  }
}
