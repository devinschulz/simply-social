'use strict';

/**
 * Routes for the application
 *
 * @param $routeProvider
 */
function Routes($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Posts',
      templateUrl: 'home/home.html',
      controllerAs: 'home',
      controller: 'HomeCtrl'
    })
    .when('/settings', {
      title: 'Settings',
      templateUrl: 'settings/settings.html',
      controllerAs: 'settings',
      controller: 'SettingsCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
}

/**
 * Prevent Angular from caching ajax requests.
 *
 * @param $httpProvider
 */
function CacheBuster($httpProvider) {
  if (!$httpProvider.defaults.headers.get) {
    $httpProvider.defaults.headers.get = {};
  }
  $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
}

/**
 * Generate a title for the page. Will grab title
 * set in Routes function.
 *
 * @param $location
 * @param $rootScope
 */
function Title($location, $rootScope) {
  $rootScope.$on('$rootChangeSuccess', function(event, current) {
    $rootScope.title = current.$$route.title;
  });
}

function Debug($logProvider) {
  $logProvider.debugEnabled(true);
}

angular
  .module('app', [
    'ngRoute',
    'ngSanitize',
    'taiPlaceholder',
    'angularModalService',
    'akoenig.deckgrid'
  ])
  .config(Routes)
  .config(CacheBuster)
  .config(Debug)
  .run(Title);

