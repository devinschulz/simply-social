/**
 * Home controller logic.
 *
 * @param $scope
 * @param FeedFactory
 * @param $sce
 */
function HomeCtrl($scope, FeedFactory, $sce) {

  FeedFactory.getFeed().then(function() {
    $scope.posts = FeedFactory.posts;
  });

  function sortByVideos(feed) {
    var posts = _.forEach(feed);
  }

  $scope.text = "Expand";
  $scope.expanded = false;

  $scope.toggleComments = function(repeaterScope) {
    repeaterScope.text = repeaterScope.expanded ? "Expand" : "Collapse";
    repeaterScope.expanded = repeaterScope.expanded ? false : true;
  };

  $scope.filters = FeedFactory.sortLabels();

  $scope.setSelected = function(element) {
    $scope.selected = element;
    $scope.show = element.type;
  };

  $scope.isSelected = function(element) {
    if ($scope.selected == element) {
      return true;
    }
  };

  $scope.setSelected($scope.filters[0]);

  /**
   * Populate sort view types
   * Grid | List
   */
  $scope.views = FeedFactory.sortType();

  /**
   * Allow SVG's to pass to views
   */
  angular.forEach($scope.views, function(view) {
    view.icon = $sce.trustAsHtml(view.icon)
  });


  $scope.setSelectedLayout = function(element) {
    $scope.selectedLayout = element;
  };

  $scope.isSelectedLayout = function(element) {
    if ($scope.selectedLayout == element) {
      return true
    }
  };

  $scope.setSelectedLayout($scope.views[0]);
}

/**
 *  Sort Posts by Category
 * @returns {Function}
 * @constructor
 */
function PostSortFilter() {
  return function(posts, category) {
    if (
      !angular.isUndefined(posts) &&
      !angular.isUndefined(category) &&
      category.length
    ) {
      var categoryArray = [];
      if (category == 'photos') {
        for (var i = 0; i < posts.length; i++) {
          if (
            posts[i].thumbnail &&
            posts[i].video == false
          ) {
            categoryArray.push(posts[i]);
          }
        }
        return categoryArray;
      } else if (category == 'videos') {
        for (var x = 0; x < posts.length; x++) {
          if (posts[x].video) {
            categoryArray.push(posts[x]);
          }
        }
        return categoryArray;
      } else {
        return posts;
      }
    } else {
      return posts;
    }
  }
}

angular
  .module('app')
  .controller('HomeCtrl', HomeCtrl)
  .filter('PostSortFilter', PostSortFilter);
