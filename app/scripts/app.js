'use strict';

angular.module('yotoApp', ['ngRoute', 'ngSanitize', 'btford.markdown', 'firebase', 'ui'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
