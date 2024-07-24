import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEvent } from './event.type';

@Injectable()
export class PublicEventService {
  constructor(private http: HttpClient) {}

  URL: string = 'http://localhost:3000/api/v1';

  getAllPublicEvents(): Observable<AppEvent[]> {
    return this.http.get<AppEvent[]>(`${this.URL}/others-events`);
  }
}
