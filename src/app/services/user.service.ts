import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RegisterResponse, User, UserRegister } from '../model/user.model';

const baseUrl = 'https://flowrspot-api.herokuapp.com/api/v1/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getOne(id: number) {
    return this.http.get<User>(`${baseUrl}/${id}`).pipe(
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

  // getOne(id: number) {
  //   return this.http.get<User>(`${baseUrl}/${id}`).pipe(
  //     map((data: User) => {
  //       return new User(data);
  //     })
  //   );
  // }

  register(user: UserRegister): Observable<UserRegister> {
    return this.http.post(`${baseUrl}/register`, user).pipe(
      map((data: any) => {
        console.log(data, 'servis register');
        return new UserRegister(data);
      })
    );
  }
}
