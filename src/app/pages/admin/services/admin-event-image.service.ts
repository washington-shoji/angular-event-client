import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { EventImage } from '../../../types/event-image';

@Injectable()
export class AdminEventImageService {
  constructor(private http: HttpClient) {}

  private URL: string = `${environment.apiUrl}/api/v1`;

  findEventImageByEventId(eventId: string): Observable<EventImage> {
    return this.http.get<EventImage>(`${this.URL}/event-id-image/${eventId}`);
  }

  updateImageFilePresignedUrl(
    presignedUrl: string,
    file: File
  ): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'image/png' });
    return this.http.put<void>(presignedUrl, file, { headers: headers });
  }
}
