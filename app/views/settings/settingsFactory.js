(function() {

  "use strict";

  /**
   * Settings Factory to fetch user data
   *
   * @param $http
   * @returns {object}
   */
  function Settings($http) {
    return {
      getProfileInformation: function(callback) {
        var url = 'data/settings.json';
        $http.get(url).success(callback);
      }
    };
  }

  angular
    .module('app')
    .factory('Settings', Settings);

})();