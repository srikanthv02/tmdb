/* Proprietary and confidential
 * Written by Srikanth Venkata,
 * Nov 2018
 */
module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // bower: {
    //   install: {}
    // },    
    uglify: {
      options: {
        sourceMap: false,
        sourceMapName: function(filePath) {
          return filePath + '.map';
        },
        beautify : false,
        mangle   : true
      },
      clientbuild: {
        files: [{
          expand: true,
          cwd: 'tmdb/concatjs',
          src: ['**/*.js', '!**/*.min.js'],
          dest: 'tmdb',
          ext: '.min.js'
        }]
      }
    },
    mocha: {
      all: {
        src: ['test/test.html'],
      },
      options: {
        run: true
      }
    },
    concat: {
      jsconcat: {
        options: {
          separator: '\n'
        },
        files: [{
          src: [
              'node_modules/@bower_components/jquery/dist/jquery.js',
              'node_modules/@bower_components/angular/angular.js',
              'node_modules/@bower_components/angular-ui-router/release/angular-ui-router.js',
              'node_modules/@bower_components/angular-local-storage/dist/angular-local-storage.js',
              'node_modules/angularjs-slider/dist/rzslider.js',
              'customlib/bootstrap.min.js'
          ],
          dest:'tmdb/concatjs/tmdb.js'
        }]
      }
    },
    concurrent: {
      dev: {
        tasks: ['watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    sass: {
      dist:{
        files:[
          {'src/partials/sections/movies/movie.css':'src/partials/sections/movies/movie.scss'},
          {'tmdb/styles/custom.css':'styles/custom.scss'},
          {'tmdb/styles/rzslider.css':'node_modules/angularjs-slider/dist/rzslider.scss'},
        ]
      }
    },
    
    watch: {
      clientJS: {
        files: [          
          'src/**/*.js'
        ],
        tasks: ['newer:jshint:client']
      },
      css: {
        files: 'src/**/*.scss',
        tasks: ['newer:sass','cssmin']
      }
    },
    
    jshint: {
      client: {
        options: {
          jshintrc: '.jshintrc-client',
          ignores: [
            'dist/**/*.min.js'
          ]
        },
        src: ['src/main.js', 'src/clientRoutes.js', 'src/partials/sections/**/*.js', 'src/partials/sections/**/**/*.js']
      }
    },
    clean: {
      // clientlib: {
      //   src: ['bower_components', 'lib']
      // },
      serverlib: {
        src: ['node_modules']
      },
      clientbuild: {
        src: ['dist', 'tmdb' , 'index.html']
      }
    },
    cssmin : {
      dist : {
        src : ["src/partials/globals/toaster/angular-toastr.css", "src/partials/sections/movies/movie.css","tmdb/styles/custom.css","tmdb/styles/rzslider.css"],
        dest : "tmdb/styles/combined.min.css"
      }
    },
    processhtml: {
      options: {
      },
      dist: {
        files: {
          'dist/index.html': ['main.html']
        }
      },
      prod: {
        files: {
          'index.html': ['main.html']
        }
      },
      dev: {
        files: {
          'index.html': ['main.html']
        }
      }
    }

  });
  //grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.registerTask('build-dev', [ 'clean:clientbuild', 'sass', 'concat:jsconcat', 'concat', 'uglify:clientbuild', 'cssmin', 'processhtml:dev', 'jshint']);
  grunt.registerTask('build-prod', [ 'clean:clientlib', 'clean:clientbuild', 'bower:install','uglify:clientlib', 'sass', 'concat:jsconcat', 'concat', 'uglify:clientbuild', 'cssmin', 'processhtml:prod', 'mocha' ]);
  grunt.registerTask('clean-directory', [  'clean:clientbuild', 'clean:serverlib']);
  grunt.registerTask('quality-check', ['jshint']);
  grunt.registerTask('compile-sass', ['sass']);
}