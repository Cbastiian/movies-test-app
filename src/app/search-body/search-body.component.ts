import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-body',
  templateUrl: './search-body.component.html',
  styleUrls: ['./search-body.component.css']
})
export class SearchBodyComponent implements OnInit {

  movies: any = [];
  load: boolean = false;
  movieSearch: string = ''
  yearSearch: string = ''

  constructor(private serviceMovies: MoviesService,
    private router: Router) { }

  ngOnInit(): void {
    this.searchMovie('room')

  }

  searchMovie(search: any) {
    try {
      this.load = true

      this.serviceMovies.getMovies(search).subscribe(movies => {
        this.movies = movies.Search
      })
    } catch (error) {
      console.log('ha ocurrido un error inesperado');
    } finally {
      this.load = false
    }
  }

  searchByTitle() {
    this.searchMovie(this.movieSearch)
  }

  movieSearchYear() {
    try {
      this.load = true

      this.serviceMovies.getMovieByYear(this.yearSearch).subscribe(movies => {
        this.movies = movies.Search
      })
    } catch (error) {
      console.log('ha ocurrido un error inesperado');
    } finally {
      this.load = false
    }
  }

  navigate(data: any) {
    this.router.navigateByUrl('/detail/' + data.imdbID);
  }

}
