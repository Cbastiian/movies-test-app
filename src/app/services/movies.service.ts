import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private endpoint = 'http://www.omdbapi.com/?apikey=87e7ed86'

  constructor(private http: HttpClient) { }

  public getMovies(title: string): Observable<any> {
    return this.http.get(this.endpoint + '&&s=' + title)
  }
}
