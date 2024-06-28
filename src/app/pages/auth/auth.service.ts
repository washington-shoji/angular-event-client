import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type UserAuth = {
  username: string;
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  URL: string = 'http://localhost:3000/api/v1';

  login(payload: UserAuth): Observable<void> {
    return this.http.post<void>(`${this.URL}/login`, payload);
  }
}
