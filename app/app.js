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
      templateUrl: 'views/posts/posts.html',
      controller: 'PostsCtrl'
    })
    .when('/settings', {
      title: 'Settings',
      templateUrl: 'views/settings/settings.html',
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
    if (current.hasOwnProperty('$$route')) $rootScope.title = current.$$route.title;
  });
}

/**
 * Force window position to top on page change.
 *
 * @param $rootScope
 * @param $window
 */
function ForceWindowTop($rootScope, $window) {
  $rootScope.$on('$routeChangeStart', function() {
    $window.scrollTo(0,0)
  });
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
  .run(Title)
  .run(ForceWindowTop);

