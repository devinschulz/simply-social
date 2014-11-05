(function() {

  "use strict";

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
   * Generate a title for the page. Will grab title
   * set in Routes function.
   *
   * @param $rootScope
   */
  function Title($rootScope) {
    $rootScope.$on("$routeChangeSuccess", function(event, currentRoute, previousRoute) {
      $rootScope.title = currentRoute.title;
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
      $window.scrollTo(0,0);
    });
  }

  angular
    .module('app', [
      'ngRoute',
      'ngSanitize',
      'taiPlaceholder',
      'monospaced.elastic',
      'angularModalService',
      'akoenig.deckgrid'
    ])
    .config(Routes)
    .run(Title)
    .run(ForceWindowTop);

})();