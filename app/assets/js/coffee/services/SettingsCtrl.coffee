SettingsCtrl = ($scope, settings) ->
  settings.getSettings().then((response) ->
    $scope.user = response.data.settings.user
    $scope.notifications = response.data.settings.notifications
    $scope.options = response.data.settings.privacy
  )

angular
  .module 'app.settings', ['settings.Service']
  .controller 'SettingsController', SettingsCtrl
