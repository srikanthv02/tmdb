/* Copyright (C) Srikanth Venkata
 * This is the main Module and entry point for routes configuration* */
/* As per AngularJS 1.x Best practices - John Papa and code formating donw with tabs and spaces */

angular.module('tmdbapp', [
	'ui.router',
	'toastr',
	'LocalStorageModule',
	'movies',
	'allServiceDetails',
	'dataFormatter',
	'rzModule',
  ]).run(['$state', function($state) {
	'use strict';
	/*this is used for initiating the application. This method is invoked at the end once all the services and controllers have loaded.*/
	$state.go('nowPlaying');
  }]).config(['$stateProvider', '$urlRouterProvider', routeConfig])
  .directive('loading', ['$compile', loading]);

/*This is a loader directive which is used in the application. We can have various cases to 
it like having a block or an inline loader as well and the size varies accordingly*/
function routeConfig($stateProvider, $urlRouterProvider) {
  "use strict";
  $stateProvider.state('nowPlaying', {
	url: '/nowPlaying',
	templateUrl: "src/partials/sections/movies/view/movie.html",
	controller: "movieCtrl",
	controllerAs: "movieType"
  });
  $urlRouterProvider.otherwise("/nowPlaying");

}

function loading($compile) {
  var getTemplate = function(type, extraClasses) {
	var template = '';
	switch (type) {
	  case 'block':
		template = "<h1 class='project block header_color'><i class='fa fa-cog fa-spin " + extraClasses + "'></i> Loading...</h1>";
		break;
	  default:
		template = "<h1 class='project block header_color'><i class='fa fa-cog fa-spin " + extraClasses + "'></i> Loading...</h1>";
		break;
	}
	return template;
  };
  return {
	restrict: 'E',
	replace: true,
	scope: true,
	link: function(scope, elm, attrs) {
	  angular.extend(scope, {
		dirLoading: function() {
		  return !!scope[attrs.name];
		}
	  });
	  var type = attrs.type;
	  var extraClasses = (attrs.classes) ? attrs.classes : 'black';
	  var template = getTemplate(type, extraClasses);
	  elm.html('').append($compile(template)(scope));
	  scope.$watch(scope.dirLoading, function(v) {
		var size = attrs.size;
		if (v) {
		  elm.show().find('.project').addClass(size);
		} else {
		  elm.hide();
		}
	  });
	}
  };
}