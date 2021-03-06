(function() {

  "use strict";

  /**
   * Home controller logic.
   *
   * @param $scope
   * @param FeedFactory
   * @param $sce
   */
  function PostsCtrl($scope, FeedFactory, $sce) {

    /**
     * Get and set posts object
     */
    FeedFactory.getFeed().then(function () {
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
    function generateId(post) {
      var comments, getLastCommentId;
      comments = post.comments;
      if (!_.isEmpty(comments)) {
        getLastCommentId = _.last(comments);
        getLastCommentId = getLastCommentId.id + 1;
      }
      return getLastCommentId || 1;
    }

    /**
     * Post
     *
     * @param post - Submitted post object
     * @param name - Authors Name
     * @param avatar - Authors Avatar
     * @param message - Post message
     * @constructor
     */
    function Post(post, name, avatar, message) {
      if (post) this.id = generateId(post);
      this.name = name;
      this.avatar = avatar;
      this.message = message;
      this.posted = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    /**
     * Add a comment to a specific post
     *
     * @param post - The current post object in the repeater scope
     * @param commentForm - The form associated to the post
     */
    $scope.addComment = function(post, commentForm) {

      // Name and avatar would be called from the
      // current user session
      var newComment = new Post(post, "Jessica Tuan", "assets/images/avatar-thumbnail.jpg", commentForm.message);
      var postComments = post.comments;
      var commentPosition = postComments.length;

      // Force the new post to be pushed to the last position of comment object
      commentPosition ? post.comments[commentPosition] = newComment : post.comments.push(newComment);

      // Reset form message
      commentForm.message = null;
    };

    /**
     * Filter Posts
     * All | Photos | Videos
     */
    $scope.filters = FeedFactory.sortLabels();

    /**
     * Set filter element as selected.
     *
     * @param element - filters repeated element
     */
    $scope.setSelected = function(element) {
      $scope.selected = element;
      $scope.show = element.type;
    };

    /**
     * Check to see if filters element is
     * truthy to set active class.
     *
     * @param element - views repeater element
     * @returns {boolean}
     */
    $scope.isSelected = function(element) {
      if ($scope.selected == element) return true;
    };

    /**
     * Set selected layout to filters all view
     * by default.
     */
    $scope.setSelected($scope.filters[0]);

    /**
     * Populate sort view types
     * Grid | List
     */
    $scope.views = FeedFactory.sortType();

    /**
     * Allow SVG's to pass to views.
     */
    angular.forEach($scope.views, function(view) {
      view.icon = $sce.trustAsHtml(view.icon);
    });

    /**
     * Set grid or list element as selected.
     *
     * @param element - views repeater element
     */
    $scope.setSelectedLayout = function(element) {
      $scope.selectedLayout = element;
    };

    /**
     * Check to see if grid or list element is
     * truthy to set active class
     *
     * @param element - views repeater element
     * @returns {boolean}
     */
    $scope.isSelectedLayout = function(element) {
      if ($scope.selectedLayout == element) return true;
    };

    /**
     * Set selected layout to list view by default
     */
    $scope.setSelectedLayout($scope.views[0]);

  }

  angular
    .module('app')
    .controller('PostsCtrl', PostsCtrl);

})();