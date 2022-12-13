import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Flower } from '../model/flower.model';

const baseUrl = 'https://flowrspot-api.herokuapp.com/api/v1/flowers';

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
export class FlowerService {
  constructor(private http: HttpClient) {}

  getFlowers(): Observable<Flower[]> {
    return this.http.get(baseUrl).pipe(
      map((data: any) => {
        return (
          (data && data.flowers.map((elem: any) => new Flower(elem))) || []
        );
      })
    );
  }

  getRandomFlowers(): Observable<Flower[]> {
    return this.http.get(`${baseUrl}/random`).pipe(
      map((data: any) => {
        return data && data.flowers.map((elem: any) => new Flower(elem));
      })
    );
  }

  getOne(id: number) {
    return this.http.get<Flower>(`${baseUrl}/${id}`).pipe(
      map((response) => {
        ({
          id: response.id,
          name: response.name,
          latin_name: response.latin_name,
          sightings: response.sightings,
          profile_picture: response.profile_picture,
          favorite: response.favorite,
          description: response.description,
          features: response.features,
        } as Flower);
        const flowerResponse = { ...response } as Flower;
        return flowerResponse;
      })
    );
  }

  getFavoriteFlowers(): Observable<Flower[]> {
    return this.http.get(`${baseUrl}/favorites`, httpOptions).pipe(
      map((data: any) => {
        console.log({ data });
        return data && data.fav_flowers.map((elem: Flower) => new Flower(elem));
      })
    );
  }

  postToFavorites(flowerId: number): Observable<Flower> {
    return this.http
      .post(`${baseUrl}/${flowerId}/favorites`, null, httpOptions)
      .pipe(
        map((data: any) => {
          return new Flower(data);
        })
      );
  }

  getFlowersSearch(query: string = ''): Observable<Flower[]> {
    return this.http.get(`${baseUrl}/search`, { params: { query } }).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  deleteFavorite(flowerId: number, favoriteId: number): Observable<Flower> {
    return this.http.delete<Flower>(
      `${baseUrl}/${flowerId}/favorites/${favoriteId}`
    );
  }
}
