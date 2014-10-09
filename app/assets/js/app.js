'use strict';
angular.module('app', ['ngRoute', 'app.directives', 'app.home', 'app.settings']).config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    }).when('/settings', {
      templateUrl: 'views/settings.html',
      controller: 'SettingsController'
    });
  }
]);

angular.module('app.home', []).controller('HomeController', [
  '$scope', function($scope) {
    return $scope.title = 'Home';
  }
]);

angular.module('app.settings', []).controller('SettingsController', [
  '$scope', function($scope) {
    return $scope.title = 'Settings';
  }
]);

angular.module('app.directives', []).directive('toggle', function() {
  return {
    restrict: 'EA',
    template: ['<a href="#" class="search_trigger" title="Toggle search">', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15.559" enable-background="new 0 0 16 15.559"><path fill="#231F20" d="M15.835 14.688l-4.151-3.746c.991-1.16 1.593-2.661 1.593-4.303-.001-3.661-2.978-6.639-6.639-6.639-3.66 0-6.638 2.978-6.638 6.638 0 3.661 2.978 6.638 6.638 6.638 1.659 0 3.174-.616 4.339-1.626l4.188 3.779c.096.086.216.129.335.129.137 0 .272-.056.371-.165.186-.204.169-.521-.036-.705zm-14.835-8.05c0-3.109 2.529-5.638 5.638-5.638s5.638 2.529 5.638 5.638-2.529 5.638-5.638 5.638-5.638-2.529-5.638-5.638z"/></svg>', '</a>'].join(''),
    transclude: true,
    link: function($scope, $element, $attrs) {
      return $element.on('click touchend', function() {
        $element.toggleClass('active');
        return $scope.toggled = $scope.toggled === true ? false : true;
      });
    }
  };
}).directive('a', function() {
  return {
    restrict: 'E',
    link: function(scope, elem, attrs) {
      if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
        return elem.on('click', function(e) {
          return e.preventDefault();
        });
      }
    }
  };
});
