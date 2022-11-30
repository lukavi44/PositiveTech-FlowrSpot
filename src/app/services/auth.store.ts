import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, shareReplay, tap } from 'rxjs';
import { UserLogin } from '../model/user.model';

const baseUrl = 'https://flowrspot-api.herokuapp.com/api/v1/users';
const AUTH_DATA = 'auth_data';

@Injectable({
  providedIn: 'root',
})
export class AuthStore {
  private subject = new BehaviorSubject<UserLogin>(null!); // null! means that the user is not yet authenticated

  user$: Observable<UserLogin> = this.subject.asObservable();
  isLoggedIn$: Observable<boolean> | undefined;

  constructor(private http: HttpClient) {
    const userData = localStorage.getItem(AUTH_DATA);
    if (!userData) {
      this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
      return;
    }
    this.user$ = new BehaviorSubject<UserLogin>(JSON.parse(userData));
    this.isLoggedIn$ = new BehaviorSubject<boolean>(true);

    const user = localStorage.getItem(AUTH_DATA);
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${baseUrl}/login`, { email, password }).pipe(
      map((user) => {
        if (user && user.auth_token) {
          localStorage.setItem(AUTH_DATA, JSON.stringify(user));
          this.subject.next(user);
          console.log(user);
        }
        return user;
      })
    );
  }

  logout() {
    localStorage.removeItem(AUTH_DATA);
    this.subject.next(null!!);
    this.isLoggedIn$ = new BehaviorSubject<boolean>(false);
  }

  getCurrentUser() {}
}

// console.log('Auth Store aaaaaa');
// this.isLoggedIn$ = this.user$.pipe(map((user: any) => !!user));
// this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggdedIn) => !loggdedIn));
// isLoggedOut$: Observable<boolean> | undefined;
