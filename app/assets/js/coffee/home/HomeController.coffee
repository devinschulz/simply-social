HomeController = ['$scope', 'feed', '$sce', ($scope, feed, $sce) ->

  # Populate feed data
  feed.getFeed().then((response) ->
    $scope.posts = response.data.feed
  )

  # Set Defaults
  $scope.text = "Expand"
  $scope.expanded = false

  $scope.toggleComments = (repeaterScope) ->
    repeaterScope.text = if repeaterScope.expanded then "Expand" else "Collapse"
    repeaterScope.expanded = if repeaterScope.expanded then false else true

  # Get and Set post filter labels
  $scope.filters = feed.sortLabels()

  $scope.setSelected = (elem) ->
    $scope.selected = elem
    $scope.show = elem.type

  $scope.isSelected = (elem) ->
    $scope.selected is elem

  # Set the active state to All by default,
  # set here to keep ng-init out of the view
  $scope.setSelected($scope.filters[0])

  # Populate sort view types
  # Grid | List
  $scope.views = feed.sortType()

  # loop through and views icons and
  # allow html to pass
  for i in $scope.views
    i.icon = $sce.trustAsHtml(i.icon)

  $scope.setSelectedLayout = (elem) ->
    $scope.selectedLayout = elem

  $scope.isSelectedLayout = (elem) ->
    $scope.selectedLayout is elem

  $scope.setSelectedLayout($scope.views[0])
]

angular
  .module 'app.home', ['userFeed']
  .controller 'HomeController', HomeController


