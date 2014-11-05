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
   * This would normally be generated server side.
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

  /**
   * Filter Posts
   */
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
   * Allow SVG's to pass to views
   */
  angular.forEach($scope.views, function(view) {
    view.icon = $sce.trustAsHtml(view.icon)
  });

  /**
   * Populate sort view types
   * Grid | List
   */
  $scope.views = FeedFactory.sortType();

  $scope.setSelectedLayout = function(element) {
    $scope.selectedLayout = element;
  };

  $scope.isSelectedLayout = function(element) {
    if ($scope.selectedLayout == element) return true;
  };

  $scope.setSelectedLayout($scope.views[0]);

}

angular
  .module('app')
  .controller('PostsCtrl', PostsCtrl);
