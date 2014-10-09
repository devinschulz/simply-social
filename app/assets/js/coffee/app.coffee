'use strict'

angular.module 'app', [
  'ngRoute'

  'app.directives'
  'app.home'
  'app.settings'
]

.config(['$routeProvider', ($routeProvider) ->
  $routeProvider

    .when '/',
      templateUrl: 'views/home.html'
      controller: 'HomeController'

    .when '/settings',
      templateUrl: 'views/settings.html'
      controller: 'SettingsController'

])