'use strict'

angular
  .module 'app', [
    'ngRoute'
    'ngSanitize'
    'monospaced.elastic'
    'taiPlaceholder'
    'app.directives'

    'app.header'
    'app.header.directives'

    'app.modal'
    'app.modal.directives'

    'app.home'
    'app.home.filters'
    'app.home.directives'

    'app.settings'
  ]

  .config(['$routeProvider', ($routeProvider) ->

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