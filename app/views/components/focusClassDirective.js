(function() {

  "use strict";

  /**
   * Adds a focus class to an input on focus and
   * removes on blur.
   *
   * @type directive
   * @returns {{link: Function}}
   */
  function FocusClass() {
    return {
      link: function($scope, $element) {
        $element.on('focus blur', function() {
          $element.toggleClass('is-focus').parent().toggleClass('is-focus');
        });
      }
    };
  }

  angular
    .module('app')
    .directive('focusClass', FocusClass);

})();