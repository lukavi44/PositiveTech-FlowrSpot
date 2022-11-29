import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Sighting,
  SightingComment,
  SightingLike,
} from '../model/sightings.model';

const baseUrl = 'https://flowrspot-api.herokuapp.com//api/v1/sightings';

@Injectable({
  providedIn: 'root',
})
export class SightingsService {
  constructor(private http: HttpClient) {}

  getAllSightings(): Observable<Sighting[]> {
    //gledaj da observable ne bude u servisu, ne treba ti tu da ga prati, PROUCI TO
    return this.http.get(baseUrl).pipe(
      map((data: any) => {
        return (
          (data && data.sightings.map((elem: any) => new Sighting(elem))) || []
        );
      })
    );
  }

  getOneSighting(id: number): Observable<Sighting> {
    return this.http.get(`${baseUrl}/${id}`).pipe(
      map((data: any) => {
        return new Sighting(data);
      })
    );
  }

  getUserSightings(id: number): Observable<Sighting[]> {
    return this.http
      .get(`https://flowrspot-api.herokuapp.com//api/v1/users/${id}/sightings`)
      .pipe(
        map((data: any) => {
          return (
            (data && data.sightings.map((elem: any) => new Sighting(elem))) ||
            []
          );
        })
      );
  }

  getSightingComments(id: number): Observable<SightingComment[]> {
    return this.http.get(`${baseUrl}/${id}/comments`).pipe(
      map((data: any) => {
        return (
          (data &&
            data.comments.map((elem: any) => new SightingComment(elem))) ||
          []
        );
      })
    );
  }

  getSightingLikes(id: number): Observable<SightingLike[]> {
    return this.http.get(`${baseUrl}/${id}/likes`).pipe(
      map((data: any) => {
        return (
          (data && data.likes.map((elem: any) => new SightingLike(elem))) || []
        );
      })
    );
  }
}
