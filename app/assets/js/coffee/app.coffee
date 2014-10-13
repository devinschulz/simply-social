'use strict'

angular.module 'app', [
  'ngRoute'
  'ngSanitize'
  'grow'
  'app.directives'

  'app.home'
  'app.home.directives'

  'app.settings'
  'app.settings.directives'
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

# Prevent angular from caching ajax requests
.config(['$httpProvider', ($httpProvider) ->
  unless $httpProvider.defaults.headers.get
    $httpProvider.defaults.headers.get = {}

  $httpProvider.defaults.headers.get['If-Modified-Since'] = '0'

])