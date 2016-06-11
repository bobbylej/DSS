var WebModule = angular.module('WebModule', ['ngRoute', 'ngStorage']);

WebModule.config(($routeProvider, $locationProvider) => {
  $routeProvider

  .when('/project', {
      templateUrl : '/templates/project/list.html',
      controller  : 'ProjectsController'
  })

  .when('/project/create', {
      templateUrl : '/templates/project/create.html',
      controller  : 'ProjectsController'
  })

  .when('/project/:id', {
      templateUrl : '/templates/project/project.html',
      controller  : 'ProjectController'
  })

  .otherwise({ redirectTo: '/' });

  /*
  //check browser support
  if(window.history && window.history.pushState) {
    $locationProvider.html5Mode(true);
  }
  */
});

WebModule.run(($rootScope, $location, $sessionStorage, $route) => {

  let routesOpenToPublic = [];
  angular.forEach($route.routes, (route, path) => {
    // push route onto routesOpenToPublic if it has a truthy publicAccess value
    route.publicAccess && (routesOpenToPublic.push(path));
  });

  $rootScope.$on('$routeChangeStart', (event, nextLoc, currentLoc) => {
    let closedToPublic = (-1 === routesOpenToPublic.indexOf($location.path()));
    if(closedToPublic && !$sessionStorage.user) {
        $location.path('/');
    }
  });
})

WebModule.factory('usefulService', function() {
  return {
    twoCharsNumber: function(number) {
      if(number > -10 && number < 10) {
        return '0' + number;
      }
      else {
        return '' + number;
      }
    },

    disjoinDatetime: function(datetime) {
      return {
        date: this.twoCharsNumber(datetime.getDate()) + '.' + this.twoCharsNumber(datetime.getMonth()+1) + '.' + datetime.getFullYear(),
				time: this.twoCharsNumber(datetime.getHours()) + ':' + this.twoCharsNumber(datetime.getMinutes())
      }
    },

    dateToStrings: function(datetime) {
      var datetimeObject = this.disjoinDatetime(datetime);
			var datetimeNowObject = this.disjoinDatetime(new Date());
			if(datetimeObject.date == datetimeNowObject.date) {
				datetimeObject.date = 'Today';
			}
			return datetimeObject;
    },
  };
});
