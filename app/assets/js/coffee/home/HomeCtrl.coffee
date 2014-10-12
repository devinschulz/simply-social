angular.module 'app.home', ['userFeed']

.controller 'HomeController', [
  '$scope'
  'feed'
  ($scope, feed) ->
    feed.getFeed().then((response) ->
      $scope.posts = response.data.feed
      console.log $scope.posts
    )

    # Set Defaults
    $scope.text = "Expand"
    $scope.expanded = false

    $scope.toggleComments = ->
      $scope.text = if $scope.expanded then "Expand" else "Collapse"
      $scope.expanded = if $scope.expanded then false else true

]

