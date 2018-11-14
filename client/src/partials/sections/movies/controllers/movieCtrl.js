/* Copyright (C) Srikanth Venkata
 */
(function(angular) {
    "use strict";
    angular.module('movies', []).controller('movieCtrl', movieController);

    movieController.$inject = ['$scope', 'servicesForProject', 'localStorageService', 'toastr', 'responseFormatter'];

    function movieController($scope, servicesForProject, localStorageService, toastr, responseFormatter) {
        $scope.beerPageLoading = true;
        /*to avoid usage of scope we employ this practise*/
        /*jshint validthis: true*/
        var movieDetails = this;

        /*loader on initial page load*/
        movieDetails.showDirective = true;

        movieDetails.attributes = {};
        movieDetails.getMovieType = movieType;
        movieDetails.getMovieGenres = responseFormatter.genreMapping;
        movieDetails.getMoviePoster = responseFormatter.moviePoster;
        movieDetails.getAllGenres = getAllGenres;
        movieDetails.genreMovie = [];
        movieDetails.minFilter = minFilter;
        movieDetails.includeMovies = includeMovies;
        movieDetails.genreFilter = genreFilter;

        /*creating story tabs and setting the URL and tab click*/
        var movieTypeTabs = {
            tab: "now_playing",
            setTab: function(tabId) {
                movieTypeTabs.tab = tabId;
                $scope.moviePageLoading = true;
                movieDetails.getMovieType(tabId);
            },
            isSet: function(tabId) {
                return movieTypeTabs.tab === tabId;
            },
            templates: {
                movieType: {
                    "title": "Now Playing",
                    "url": "src/partials/sections/movies/tabs/movieType.html"
                }
            }
        };
        movieDetails.tab = movieTypeTabs;

        /*This is on initial load*/
        movieDetails.init = function() {
            movieDetails.getMovieType('now_playing');
            movieDetails.getAllGenres();
        };

        movieDetails.init();

        function getAllGenres() {
            servicesForProject.getMovieGenres().then(function(response) {
                movieDetails.genreList = response.genres;
            });
        }

        // function for generating random another beer - Alcohlic and non alcoholic.
        function movieType(movieType) {
            movieDetails.movieList = [];
            servicesForProject.getMovieType(movieType).then(function(typeDetails) {
                if (typeDetails.results && typeDetails.results.length > 0) {
                    //map is faster than using angular.ForEach - Best Practices from Angular
                    typeDetails.results.map(function(value) {
                        movieDetails.attributes = {
                            id: value.id,
                            title: value.title,
                            rating: value.vote_average,
                            poster: movieDetails.getMoviePoster(value.poster_path),
                            genre: movieDetails.getMovieGenres(value.genre_ids)
                        };
                        movieDetails.movieList.push(movieDetails.attributes);
                        $scope.beerPageLoading = false;
                        $scope.moviePageLoading = false;
                    });
                }
            }, function(error) {
                /*Check for error state, in case API doesn't load or give any result*/
                console.log(error);
                $scope.beerPageLoading = false;
                $scope.moviePageLoading = false;
            });
        }

        movieDetails.slider = {
            value: 3,
            options: {
                floor: 0,
                ceil: 10,
                step: 0.5,
                precision: 1
            }
        };

        function minFilter(movie) {
            return movie.rating >= movieDetails.slider.value;
        }
        
        function includeMovies(genre) {
            var i = $.inArray(genre, movieDetails.genreMovie);
            if (i > -1) {
                movieDetails.genreMovie.splice(i, 1);
            } else {
                movieDetails.genreMovie = movieDetails.genreMovie.concat(genre);

            }
        }

        function genreFilter(movies){
            if (movieDetails.genreMovie.length > 0) {
                for (var i = 0; i < movies.genre.length; i++) {
                    if ($.inArray(movies.genre[i].name, movieDetails.genreMovie) > -1) {
                        return movies;
                    } else {
                        return;
                    }
                }
            }
            return movies;
        }

    }


})(angular);