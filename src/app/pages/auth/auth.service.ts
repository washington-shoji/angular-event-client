import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from '../../services/session-storage/session-storage.service';
import { environment } from '../../../../environments/environment';

export type UserAuth = {
  username: string;
  email: string;
  password: string;
};

export type ApiToken = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class AuthService {
  private _sessionAccessToken: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(
      JSON.stringify(this.sessionStorageService.getData('accessToken'))
    );
  public sessionAccessToken$: Observable<string | null> =
    this._sessionAccessToken.asObservable();

  private _sessionRefreshToken: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(
      JSON.stringify(this.sessionStorageService.getData('refreshToken'))
    );
  public sessionRefreshToken$: Observable<string | null> =
    this._sessionRefreshToken.asObservable();

  private _apiToken: BehaviorSubject<ApiToken | null> =
    new BehaviorSubject<ApiToken | null>(null);
  public token$: Observable<ApiToken | null> = this._apiToken.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {}

  URL: string = `${environment.apiUrl}/api/v1`;

  login(payload: UserAuth): Observable<ApiToken> {
    const apiResponseObservable = this.getApiToken({ payload: payload });

    return apiResponseObservable.pipe(
      map((apiTokenData) => {
        this._apiToken.next(apiTokenData);
        const { accessToken, refreshToken } = apiTokenData;
        if (accessToken && refreshToken) {
          this._apiToken.next(apiTokenData);
        }
        return apiTokenData;
      })
    );
  }

  register(payload: UserAuth): Observable<void> {
    return this.http.post<void>(`${this.URL}/register`, payload);
  }

  logout(): void {
    const refreshToken = this.sessionStorageService.getData('refreshToken');
    this.http
      .post<void>(`${this.URL}/logout`, { refreshToken: refreshToken })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.sessionStorageService.removeData('accessToken');
          this.sessionStorageService.removeData('refreshToken');

          this._apiToken.next(null);
          this._sessionAccessToken.next(null);
          this._sessionRefreshToken.next(null);

          this.router.navigate(['login']);
        },
        error: (error) => {
          throw error;
        },
      });
  }

  refreshToken(refreshToken: string): Observable<ApiToken> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${refreshToken}`,
      }),
    };
    return this.http.post<ApiToken>(
      `${this.URL}/refresh-token`,
      {},
      {
        headers: httpOptions.headers,
      }
    );
  }

  get apiToken(): ApiToken {
    const accessToken = this.sessionStorageService.getData('accessToken');
    const refreshToken = this.sessionStorageService.getData('refreshToken');

    return <ApiToken>{
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  private getApiToken({
    payload,
  }: {
    payload?: UserAuth;
    refreshToken?: string;
  }): Observable<ApiToken> {
    return this.http.post<ApiToken>(`${this.URL}/login`, payload).pipe(
      map((tokenData) => {
        this.sessionStorageService.saveData(
          'accessToken',
          tokenData.accessToken
        );
        this.sessionStorageService.saveData(
          'refreshToken',
          tokenData.refreshToken
        );

        return <ApiToken>{
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
        };
      })
    );
  }
}
