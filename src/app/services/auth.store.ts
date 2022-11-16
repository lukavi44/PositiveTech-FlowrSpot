import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { User, UserLogin } from '../model/user.model';

const baseUrl = 'https://flowrspot-api.herokuapp.com/api/v1/users';
const AUTH_DATA = 'auth_data';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private subject = new BehaviorSubject<UserLogin>(null!); // null! means that the user is not yet authenticated

  user$: Observable<UserLogin> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedIn$ = this.user$.pipe(map((user: any) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggdedIn) => !loggdedIn));

    const user = localStorage.getItem(AUTH_DATA);
  }

  login(email: string, password: string) {
    return this.http
      .post<UserLogin>(`${baseUrl}/login`, { email, password })
      .pipe(
        map((user) => {
          if (user && user.auth_token) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.subject.next(user);
          }

          return user;
        })
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.subject.next(null!!);
  }
}
