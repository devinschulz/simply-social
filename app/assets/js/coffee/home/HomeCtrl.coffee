HomeController = ($scope, feed) ->
  feed.getFeed().then((response) ->
    $scope.posts = response.data.feed
  )

  # Set Defaults
  $scope.text = "Expand"
  $scope.expanded = false

  $scope.toggleComments = (repeaterScope) ->
    repeaterScope.text = if repeaterScope.expanded then "Expand" else "Collapse"
    repeaterScope.expanded = if repeaterScope.expanded then false else true

angular
  .module 'app.home', ['userFeed']
  .controller 'HomeController', HomeController

