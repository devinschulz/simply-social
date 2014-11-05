(function() {

  "use strict";

  /**
   * Controller for home page logic
   *
   * @param $scope
   * @param $rootScope
   * @param ModalService
   */
  function HeaderCtrl($scope, $rootScope, ModalService) {
    $scope.openModal = function () {
      ModalService.showModal({
        templateUrl: 'views/modal/modal.html',
        controller: 'ModalCtrl'
      }).then(function () {
        $rootScope.modalOpen = true;
      });
    };
  }

  angular
    .module('app')
    .controller('HeaderCtrl', HeaderCtrl);

})();