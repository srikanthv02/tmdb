/* Copyright (C) Srikanth Venkata */
(function(angular) {
    "use strict";
    angular.module('dataFormatter', [])
        .service('responseFormatter', ['servicesForProject', function(servicesForProject) {
            /*This factory is used for formatting the movie data and use it for all movie types*/
            return {
                genreMapping: function(genreIDs) {
                    var temp = [];
                    servicesForProject.getMovieGenres(genreIDs).then(function(response) {
                        genreIDs.map(function(genre) {
                            response.genres.map(function(genreDetails) {
                                if (genre === genreDetails.id) {
                                    var genreObj = {
                                        name: genreDetails.name
                                    };
                                    temp.push(genreObj);
                                }
                            });
                        });
                    });
                    return temp;
                },
                moviePoster: function(posterPath) {
                    if (posterPath) {
                        return servicesForProject.getMoviePoster(posterPath);
                    }
                }
            };
        }]);
})(angular);