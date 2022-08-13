import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { MoviesService } from '../services/movies.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  constructor(
    private serviceMovies: MoviesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  movieId = ''
  load = false
  movieData: any
  error: boolean = false


  ngOnInit(): void {

    this.route.params.forEach((params: Params) => {
      this.movieId = params['id'];
      this.getMovieData()
    })

  }

  getMovieData() {
    try {
      this.load = true
      this.serviceMovies.getMovieById(this.movieId).subscribe(response => {


        if (response.Response == 'True') {
          this.movieData = response
          this.error = false
        } else {
          this.error = true
        }
      });


    } catch (error) {
      this.toastr.error('Error', 'Algo ha fallado durante la ejecución');
    } finally {
      this.load = false
    }
  }

}
