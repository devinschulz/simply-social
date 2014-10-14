ModalController = [
  '$scope',
  '$timeout',
  '$rootScope',
  'close',
  ($scope, $timeout, $rootScope, close) ->

    open = ->
      $scope.open = if $scope.open is true then false else true

    $timeout open, 200

    $scope.closeModal = ->
      $rootScope.modalOpen = false
      $timeout open, 0
      close({}, 1000)
]

angular
  .module 'app.modal', ['angularModalService']
  .controller 'ModalController', ModalController
