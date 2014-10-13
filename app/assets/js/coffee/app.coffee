'use strict'

angular
  .module 'app', [
    'ngRoute'
    'ngSanitize'
    'grow'
    'app.directives'

    'app.header'

    'app.home'
    'app.home.directives'

    'app.settings'
    'app.settings.directives'
  ]

  .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) ->

    # Remove hash from URL
    $locationProvider.html5Mode(true)

    $routeProvider
      .when '/',
        title: 'Posts'
        templateUrl: 'views/home.html'
        controller: 'HomeController'
      .when '/settings',
        title: 'Settings'
        templateUrl: 'views/settings.html'
        controller: 'SettingsController'

  ])

  # Prevent angular from caching ajax requests
  .config(['$httpProvider', ($httpProvider) ->
    unless $httpProvider.defaults.headers.get
      $httpProvider.defaults.headers.get = {}

    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0'

  ])

  # Set the page title
  .run(['$location', '$rootScope', ($location, $rootScope) ->
    $rootScope.$on '$routeChangeSuccess', (event, current, previous) ->
      $rootScope.title = current.$$route.title
  ])