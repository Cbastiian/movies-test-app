import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  constructor(
    private serviceMovies: MoviesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  movieId = ''
  load = false
  movieData: any

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.movieId = params['id'];
      this.getMovieData()
    })

  }

  getMovieData() {
    try {
      this.load = true
      this.serviceMovies.getMovieById(this.movieId).subscribe(movie => {
        this.movieData = movie
      });


    } catch (error) {
      console.log('ha ocurrido un error inesperado');
    } finally {
      this.load = false
    }
  }

}
