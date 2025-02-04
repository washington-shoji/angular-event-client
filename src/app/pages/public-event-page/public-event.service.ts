import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AppEventRequest } from '../../types/event-all-info';

@Injectable()
export class PublicEventService {
  constructor(private http: HttpClient) {}

  URL: string = `${environment.apiUrl}/api/v1`;

  getAllPublicEvents(): Observable<AppEventRequest[]> {
    return this.http.get<AppEventRequest[]>(`${this.URL}/public-events`);
  }

  getAllOthersEvents(): Observable<AppEventRequest[]> {
    return this.http.get<AppEventRequest[]>(`${this.URL}/others-events`);
  }
}
