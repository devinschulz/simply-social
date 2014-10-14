HeaderController = ($scope, $rootScope, ModalService) ->

  $scope.openModal = (event) ->
    event.preventDefault()
    ModalService.showModal
      templateUrl: "views/modal/modal.html"
      controller: "ModalController"
    .then( ->
      $rootScope.modalOpen = true
    )

angular
  .module 'app.header', ['angularModalService']
  .controller 'HeaderController', HeaderController
