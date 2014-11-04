/**
 * Check to see if Ajax requests are complete
 *
 * @returns {{restrict: string, link: Link}}
 * @constructor
 */
function Loading($http) {

  function link($scope, element, attrs) {
    /**
     * Check to see if any pending requests are left
     * @returns {boolean}
     */
    $scope.loading = function() {
      return $http.pendingRequests.length !== 0;
    };

    /**
     * Watch isLoading to be truthy
     */
    $scope.$watch($scope.loading(), function(loaded) {
      if (attrs.loading == 'spinner') {
        loaded ? element.removeClass('hide') : element.addClass('hide');
      } else {
        loaded ? element.addClass('hide') : element.removeClass('hide');
      }
    });
  }

  return {
    restrict: 'A',
    link: link
  };
}

angular
  .module('app')
  .directive('loading', Loading);