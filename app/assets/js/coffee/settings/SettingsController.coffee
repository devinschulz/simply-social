SettingsCtrl = ['$scope', 'settings', ($scope, settings) ->
  settings.getSettings().then((response) ->
    $scope.user = response.data.settings.user
    $scope.notifications = response.data.settings.notifications
    $scope.options = response.data.settings.privacy
  )

  $scope.saveUserDetails = ->
    # Save user logic would go here. This just sets
    # the form to pristine state for the demo.
    $scope.settings.$setPristine()
]

angular
  .module 'app.settings', ['settings.Service']
  .controller 'SettingsController', SettingsCtrl
