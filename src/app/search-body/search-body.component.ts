import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-search-body',
  templateUrl: './search-body.component.html',
  styleUrls: ['./search-body.component.css']
})
export class SearchBodyComponent implements OnInit {

  movies: any = [];
  load: boolean = false;
  error: boolean = false;
  movieSearch: string = ''
  yearSearch: string = ''

  constructor(private serviceMovies: MoviesService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.searchMovie('room', true)
  }

  searchMovie(search: any, load: boolean) {
    try {
      if (this.movieSearch.length <= 2 && !load) {
        this.toastr.warning('Advertencia', 'Debes ingresar minimo 3 caracteres');
      } else {
        this.load = true

        this.serviceMovies.getMovies(search).subscribe(response => {

          if (response.Response == 'False') {
            this.toastr.error('Error', response.Error);
          } else {
            this.movies = response.Search
          }
        })
      }
    } catch (error) {
      this.toastr.error('Error', 'Algo ha fallado durante la ejecución');
    } finally {
      this.load = false
    }
  }

  searchByTitle() {
    this.searchMovie(this.movieSearch, false)
  }

  movieSearchYear() {
    try {
      this.load = true

      this.serviceMovies.getMovieByYear(this.yearSearch).subscribe(response => {


        if (response.Response == 'False') {
          this.toastr.error('Error', 'Algo ha fallado durante la ejecución');
        } else {
          this.movies = response.Search

        }
      })

    } catch (error) {
      this.toastr.error('Error', 'Algo ha fallado durante la ejecución');
    } finally {
      this.load = false
    }
  }

  navigate(data: any) {
    this.router.navigateByUrl('/detail/' + data.imdbID);
  }

}
