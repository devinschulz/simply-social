angular.module 'userFeed', []

.factory 'feed', ['$http', ($http) ->
  factory = {}
  factory.getFeed = ->
    $http.get('data/feed.json').success (response) ->
      return response.feed

  return factory
]