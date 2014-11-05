(function() {

  "use strict";

  /**
   * Modal Config Directive
   *
   * @param $timeout
   * @returns {{restrict: string, link: modalFunction}}
   */
  function ModalConfig($timeout) {

    function modalFunction($scope, $element) {

      function setModalPosition() {
        $timeout(function () {
          $element.css({
            left: (window.innerWidth / 2) - ($element.prop('offsetWidth') / 2) + "px",
            top: (window.innerHeight / 2) - ($element.prop('offsetHeight') / 2) + "px"
          });
        });
      }

      angular.element(window).on('resize', function () {
        setModalPosition();
      });

      setModalPosition();
    }

    return {
      restrict: 'A',
      link: modalFunction
    };
  }

  angular
    .module('app')
    .directive('modalConfig', ModalConfig);

})();