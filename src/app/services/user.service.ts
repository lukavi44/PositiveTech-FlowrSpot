import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterResponse, User, UserRegister } from '../model/user.model';

const baseUrl = 'https://flowrspot-api.herokuapp.com/api/v1/users/register';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  register(user: UserRegister): Observable<RegisterResponse> {
    console.log('in register');
    return this.http.post<RegisterResponse>(baseUrl, user);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
