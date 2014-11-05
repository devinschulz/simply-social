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
  .filter('PostSortFilter', PostSortFilter);
