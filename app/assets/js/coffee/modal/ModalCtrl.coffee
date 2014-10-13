ModalController = ($scope, $rootScope, close) ->
  $scope.closeModal = ->
    $rootScope.modalOpen = false
    close()

angular
  .module 'app.modal', ['angularModalService']
  .controller 'ModalController', ModalController
