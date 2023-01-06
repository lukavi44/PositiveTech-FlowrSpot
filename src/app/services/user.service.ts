import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User, UserRegister } from '../model/user.model';

const baseUrl = 'https://flowrspot-api.herokuapp.com/api/v1/users';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem('auth_data') || '').auth_token
    }`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getOne(id: number) {
    return this.http.get<User>(`${baseUrl}/${id}`, httpOptions).pipe(
      map((response) => {
        ({
          id: response.id,
          first_name: response.first_name,
          last_name: response.last_name,
        } as unknown as User);
        const userResponse = { ...response } as User;
        return userResponse;
      })
    );
  }

  getMyInfo(): Observable<User> {
    return this.http.get(`${baseUrl}/me`, httpOptions).pipe(
      map((data: any) => {
        console.log(data, 'iz servisa');
        return data;
      })
    );
  }

  updateMyInfo(user: User): Observable<User> {
    return this.http.put(`${baseUrl}/me`, user, httpOptions).pipe(
      map((data: any) => {
        return new User(data);
      })
    );
  }

  refreshToken() {
    return this.http.get(`${baseUrl}/me/refresh`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  register(user: UserRegister): Observable<UserRegister> {
    return this.http.post(`${baseUrl}/register`, user).pipe(
      map((data: any) => {
        return new UserRegister(data);
      })
    );
  }
}
