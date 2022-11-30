import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Flower } from '../model/flower.model';

const baseUrl = 'https://flowrspot-api.herokuapp.com/api/v1/flowers';

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

  // getFavoriteFlowers(): Observable<Flower[]> {
  //   return this.http.get(`${baseUrl}/favorites`).pipe(map((data: any) => {
  //     return data
  //   }))
  // }
}
