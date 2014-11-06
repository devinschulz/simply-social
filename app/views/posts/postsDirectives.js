(function() {

  "use strict";

  /**
   * Posted On
   *
   * @type directive
   * @description Set a human readable date
   * @example <posted-on posted="posted.date"></posted-on>
   * @returns {{restrict: string, template: string, replace: boolean, scope: {posted: string}, link: Function}}
   */

  function PostedOn($interval) {

    function link($scope, $element, $attrs) {
      $interval(function () {
        $scope.formattedDate = moment($scope.posted).twitterShort();
      }, 200);
    }

    return {
      restrict: 'AE',
      template: '<time datetime="{{posted}}">{{formattedDate}}</time>',
      replace: true,
      scope: {
        posted: "="
      },
      link: link
    };
  }

  angular
    .module('app')
    .directive('postedOn', PostedOn);

})();