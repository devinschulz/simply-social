/**
 * Home controller logic.
 *
 * @param $scope
 * @param FeedFactory
 * @param $sce
 */
function PostsCtrl($scope, FeedFactory, $sce) {

  FeedFactory.getFeed().then(function() {
    $scope.posts = FeedFactory.posts;
  });

  /**
   * Toggle Expand and Collapse post comments
   *
   * @param post - post of repeater scope
   */
  $scope.toggleComments = function(post) {
    post.text = post.expanded ? "Expand" : "Collapse";
    post.expanded = post.expanded ? false : true;
  };

  /**
   * Set the next post comment id
   *
   * @param post
   * @returns int Post Id
   */
  function generateCommentId(post) {
    var comments = post.comments;
    if (!_.isEmpty(comments)) {
      var getLastCommentId = _.last(comments);
      return getLastCommentId.id + 1;
    } else {
      return 1;
    }
  }

  /**
   * Add a comment to a specific post
   *
   * @param post - The current post object in the repeater scope
   * @param commentForm - The form associated to the post
   */
  $scope.addComment = function(post, commentForm) {
    var newComment = new function() {
      this.id = generateCommentId(post);
      // This would normally be pulled from the current user session
      this.name = "Jessica Tuan";
      this.avatar = "assets/images/avatar-thumbnail.jpg";
      this.message = commentForm.message;
      this.posted = moment().format('YYYY-MM-DD HH:mm:ss');
    };

    var postComments = post.comments;
    var commentPosition = postComments.length;

    // Force the new post to be pushed to the last position of comment object
    commentPosition ? post.comments[commentPosition] = newComment : post.comments.push(newComment);

    // Reset form message
    commentForm.message = null;
  };

  $scope.filters = FeedFactory.sortLabels();

  $scope.setSelected = function(element) {
    $scope.selected = element;
    $scope.show = element.type;
  };

  $scope.isSelected = function(element) {
    if ($scope.selected == element) return true;
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
    if ($scope.selectedLayout == element) return true;
  };

  $scope.setSelectedLayout($scope.views[0]);

}

/**
 *  Sort Posts by Category
 * @returns {object}
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
  .controller('PostsCtrl', PostsCtrl)
  .filter('PostSortFilter', PostSortFilter);
