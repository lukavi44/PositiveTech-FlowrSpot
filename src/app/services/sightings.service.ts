import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  Sighting,
  SightingComment,
  SightingLike,
} from '../model/sightings.model';

const baseUrl = 'https://flowrspot-api.herokuapp.com/api/v1/sightings';
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: `Bearer ${
      JSON.parse(localStorage.getItem('auth_data') || '{}').auth_token || ''
    }`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SightingsService {
  constructor(private http: HttpClient) {}

  getAllSightings(): Observable<Sighting[]> {
    return this.http.get(baseUrl).pipe(
      map((data: any) => {
        return (
          (data && data.sightings.map((elem: any) => new Sighting(elem))) || []
        );
      })
    );
  }

  postSighting(sighting: any): Observable<Sighting> {
    console.log('SIGHTING', sighting);
    return this.http.post<Sighting>(baseUrl, sighting, httpOptions).pipe(
      map((data: any) => {
        return new Sighting(data);
      })
    );
  }

  getOne(id: number) {
    return this.http.get<Sighting>(`${baseUrl}/${id}`).pipe(
      map((response) => {
        ({
          id: response.id,
          description: response.description,
          picture: response.picture,
          likes_count: response.likes_count,
          comments_count: response.comments_count,
          created_at: response.created_at,
          flower: response.flower,
          latitude: response.latitude,
          longitude: response.longitude,
          name: response.name,
          user: response.user,
        } as unknown as Sighting);
        const userResponse = { ...response } as Sighting;
        return userResponse;
      })
    );
  }

  getUserSightings(id: number): Observable<Sighting[]> {
    return this.http
      .get(
        `https://flowrspot-api.herokuapp.com//api/v1/users/${id}/sightings`,
        httpOptions
      )
      .pipe(
        map((data: any) => {
          return (
            (data && data.sightings.map((elem: any) => new Sighting(elem))) ||
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

  deleteSightingLike(sightingId: number) {}

  postLike(sightingId: number) {}

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

  postSightingComment(sightingId: number, comm: any): Observable<Comment> {
    return this.http
      .post<Comment>(`${baseUrl}/${sightingId}/comments`, comm, httpOptions)
      .pipe(
        map((response: any) => {
          return new Comment(response);
        })
      );
  }

  deleteSightingComment(
    sightingId: number,
    commId: number
  ): Observable<SightingComment> {
    return this.http
      .delete(`${baseUrl}/${sightingId}/comments/${commId}`, httpOptions)
      .pipe(
        map((data: any) => {
          return new SightingComment(data);
        })
      );
  }

  deleteSighting(sightingId: number): Observable<Sighting> {
    return this.http
      .delete<Sighting>(`${baseUrl}/${sightingId}`, httpOptions)
      .pipe(
        map((data: Sighting) => {
          return new Sighting(data);
        })
      );
  }

  updateSighting(
    sightingId: number,
    updatedSighting: Sighting
  ): Observable<Sighting> {
    return this.http
      .put<Sighting>(`${baseUrl}/${sightingId}`, updatedSighting, httpOptions)
      .pipe(
        map((data: Sighting) => {
          return new Sighting(data);
        })
      );
  }
}
