/**
 * Check to see if Ajax requests are complete
 *
 * @returns {{restrict: string, link: Link}}
 * @constructor
 */
function Loading() {

  function Link($scope, $element, $attrs) {
    /**
     * Check to see if any pending requests are left
     * @returns {boolean}
     */
    $scope.isLoading = function() {
      return $http.pendingRequests.length !== 0;
    };

    /**
     * Watch isLoading for it to be truthy
     */
    $scope.$watch($scope.isLoading(), function(loaded) {
      loaded ? $element.show() : $element.hide();
    });
  }

  return {
    restrict: 'A',
    link: Link
  }
}

angular
  .module('app')
  .directive('Loading', Loading);