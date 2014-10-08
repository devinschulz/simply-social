'use strict';
angular.module('app', ['ngRoute', 'app.home', 'app.settings']).config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    }).when('/settings', {
      templateUrl: 'views/settings.html',
      controller: 'SettingsController'
    });
  }
]);

angular.module('app.home', []).controller('HomeController', [
  '$scope', function($scope) {
    return $scope.title = 'Home';
  }
]);

angular.module('app.settings', []).controller('SettingsController', [
  '$scope', function($scope) {
    return $scope.title = 'Settings';
  }
]);
