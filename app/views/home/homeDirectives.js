/**
 * Posted On Directive used in comments to display
 * the posted time/day. It is initially parsed with
 * Moment.
 *
 * @returns {{restrict: string, template: string, replace: boolean, scope: {posted: string}, link: Function}}
 */

function PostedOn($interval) {

  function link($scope, $element, $attrs) {
    $interval(function() {
      $scope.formattedDate = moment($scope.posted).twitterShort();
    }, 1000);
  }

  return {
    restrict: 'AE',
    template: '<time datetime="{{posted}}">{{formattedDate}}</time>',
    replace: true,
    scope: {
      posted: "="
    },
    link: link
  }
}

angular
  .module('app')
  .directive('postedOn', PostedOn);