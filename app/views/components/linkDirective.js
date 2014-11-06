(function() {

  "use strict";

  /**
   * Prevent default on all empty links. This would generally
   * not be necessary in a production environment.
   *
   * @type directive
   * @returns {{restrict: string, link: Function}}
   */
  function Link() {
    var linkFunction = function($scope, element, attributes) {
      if (
        attributes.ngClick ||
        attributes.href === '' ||
        attributes.href == '#'
      ) {
        element.on('click', function(event) {
          event.preventDefault();
        });
      }
    };

    return {
      restrict: 'E',
      link: linkFunction
    };
  }

  angular
    .module('app')
    .directive('a', Link);

})();