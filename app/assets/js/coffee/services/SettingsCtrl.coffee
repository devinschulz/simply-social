angular.module 'app.settings', [
  'settings.Service'
]

.controller 'SettingsController', [
  '$scope'
  'settings'
  ($scope, settings) ->
    settings.getSettings().then((response) ->
      console.log response
      $scope.user = response.data.settings.user
      $scope.notifications = response.data.settings.notifications
      $scope.options = response.data.settings.privacy
    )
]