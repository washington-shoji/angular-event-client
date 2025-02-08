import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { EventStats } from '../../../types/event-stats';
import { Observable } from 'rxjs';

@Injectable()
export class AdminStatsService {
  constructor(private http: HttpClient) {}

  private URL: string = `${environment.apiUrl}/api/v1`;

  getEventsStats(): Observable<EventStats> {
    return this.http.get<EventStats>(`${this.URL}/events-stats`);
  }
}
