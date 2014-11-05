(function() {

  "use strict";

  /**
   * Settings Controller Logic
   *
   * @param $scope
   * @param Settings
   */
  function SettingsCtrl($scope, Settings) {
    Settings.getProfileInformation(function (response) {
      var data = response.settings;
      $scope.user = data.user;
      $scope.notifications = data.notifications;
      $scope.options = data.privacy;
    });

    /**
     * This would send the current details to the server
     */
    $scope.saveUserDetails = function () {
      return $scope.settings.$setPristine();
    };
  }

  angular
    .module('app')
    .controller('SettingsCtrl', SettingsCtrl);

})();