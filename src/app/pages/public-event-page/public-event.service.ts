import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppRegisteredEvent } from '../../types/event';
import { environment } from '../../../../environments/environment';

@Injectable()
export class PublicEventService {
  constructor(private http: HttpClient) {}

  URL: string = `${environment.apiUrl}/api/v1`;

  getAllPublicEvents(): Observable<AppRegisteredEvent[]> {
    return this.http.get<AppRegisteredEvent[]>(`${this.URL}/others-events`);
  }
}
