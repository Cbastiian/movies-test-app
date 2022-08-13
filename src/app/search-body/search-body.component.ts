import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-search-body',
  templateUrl: './search-body.component.html',
  styleUrls: ['./search-body.component.css']
})
export class SearchBodyComponent implements OnInit {

  movies: any = [];

  constructor(private serviceMovies: MoviesService) { }

  ngOnInit(): void {

    try {
      this.serviceMovies.getMovies('room').subscribe(movies => {
        this.movies = movies.Search
      });
    } catch (error) {
      console.log('ha ocurrido un error inesperado');
    }
  }

}
