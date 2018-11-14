/* Copyright (C) Srikanth Venkata */
/* As per best practices from John Papa*/
(function (angular) {
    "use strict";
    angular.module('allServiceDetails',[]).service('servicesForProject',servicesForProject);
    
    servicesForProject.$inject = [ '$q', '$http', 'toastr'];

    function servicesForProject($q, $http, toastr){
        /*jshint validthis: true*/
        var servicesForProject={
            promiseGet : promiseGet,
            getMovieType : getMovieType,
            getMovieGenres : getMovieGenres,
            getMoviePoster : getMoviePoster  
        };

        return servicesForProject;

        /*Writing a genetic function for HTTP Get call with the usage of promise*/
        function promiseGet (paramsObject) {
            var deferred = $q.defer();
            $http.get(paramsObject.url)
                .success(function(data) {
                    deferred.resolve(data);
                })
                .error(function(data) {
                    deferred.reject();
                    toastr.error(data.error);
                });
            return deferred.promise;
        }

        //for getting movie type (now playing, latest, popular)
        function getMovieType (movieType) {
            var params = {
                url: 'https://api.themoviedb.org/3/movie/' + movieType + '?api_key=7af46ede7373e3339ef7980f35025ed3&language=en-US&page=1&region=US'
            };
            
            return servicesForProject.promiseGet(params);
        }

        //for getting the list of movie genres
        function getMovieGenres () {
            var params = {
                url: 'https://api.themoviedb.org/3/genre/movie/list?&api_key=7af46ede7373e3339ef7980f35025ed3&language=en-US',
                cache: true
            };
            return servicesForProject.promiseGet(params);
        }

        //for getting the list of movie images
        function getMoviePoster (posterPath) {
            var url = 'https://image.tmdb.org/t/p/w342' + posterPath;
            return url;
        }
      }  
    })(angular);