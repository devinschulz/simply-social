/**
 * Modal Controller Logic.
 *
 * This controller is triggered from the header controller.
 *
 * @param $scope
 * @param $timeout
 * @param $rootScope
 * @param close Method imported through angularModalService
 */
function ModalCtrl($scope, $timeout, $rootScope, close, $document) {

  function toggleModalState() {
    $scope.open = $scope.open ? false : true;
  }

  $timeout(toggleModalState, 200);

  function triggerClose() {
    $rootScope.modalOpen = false;
    toggleModalState();
    close({});
  }

  $scope.closeModal = function () {
    triggerClose();
  };

  /**
   * ESC - When a user hits esc, close modal
   * @param keyEvent
   */
  function keyUpHandler(keyEvent) {
    if (keyEvent.keyCode == 27) triggerClose();
  }

  $document.on('keyup', keyUpHandler);
  $scope.$on('$destroy', function() {
    $document.off('keyup', keyUpHandler)
  });
}

angular
  .module('app')
  .controller('ModalCtrl', ModalCtrl);
