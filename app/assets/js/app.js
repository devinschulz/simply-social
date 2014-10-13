'use strict';
angular.module('app', ['ngRoute', 'ngSanitize', 'grow', 'app.directives', 'app.home', 'app.home.directives', 'app.settings', 'app.settings.directives']).config([
  '$routeProvider', function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    }).when('/settings', {
      templateUrl: 'views/settings.html',
      controller: 'SettingsController'
    });
  }
]).config([
  '$httpProvider', function($httpProvider) {
    if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
    }
    return $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
  }
]);


/**
The MIT License (MIT)

Copyright (c) 2013 Thom Seddon
Copyright (c) 2010 Google

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

Adapted from: http://code.google.com/p/gaequery/source/browse/trunk/src/static/scripts/jquery.autogrow-textarea.js

Works nicely with the following styles:
textarea {
resize: none;
word-wrap: break-word;
transition: 0.05s;
-moz-transition: 0.05s;
-webkit-transition: 0.05s;
-o-transition: 0.05s;
}

Usage: <textarea auto-grow></textarea>
 */
angular.module('grow', []).directive("autoGrow", function() {
  return {
    link: function(scope, element, attr) {
      var $shadow, minHeight, paddingLeft, paddingRight, update;
      minHeight = element[0].offsetHeight;
      paddingLeft = element.css("paddingLeft");
      paddingRight = element.css("paddingRight");
      $shadow = angular.element("<div></div>").css({
        position: "absolute",
        top: -10000,
        left: -10000,
        width: element[0].offsetWidth - parseInt(paddingLeft || 0) - parseInt(paddingRight || 0),
        fontSize: element.css("fontSize"),
        fontFamily: element.css("fontFamily"),
        lineHeight: element.css("lineHeight"),
        resize: "none"
      });
      angular.element(document.body).append($shadow);
      update = function() {
        var times, val;
        times = function(string, number) {
          var i, r;
          i = 0;
          r = "";
          while (i < number) {
            r += string;
            i++;
          }
          return r;
        };
        val = element.val().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/&/g, "&amp;").replace(/\n$/, "<br/>&nbsp;").replace(/\n/g, "<br/>").replace(/\s{2,}/g, function(space) {
          return times("&nbsp;", space.length - 1) + " ";
        });
        $shadow.html(val);
        element.css("height", Math.max($shadow[0].offsetHeight + 10, minHeight) + "px");
      };
      element.bind("keyup keydown keypress change", update);
      update();
    }
  };
});

var a, dropdown, focusClass, toggle;

toggle = function() {
  return {
    restrict: 'EA',
    template: ['<a href="#" class="search_trigger" title="Toggle search">', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15.559" enable-background="new 0 0 16 15.559"><path fill="#231F20" d="M15.835 14.688l-4.151-3.746c.991-1.16 1.593-2.661 1.593-4.303-.001-3.661-2.978-6.639-6.639-6.639-3.66 0-6.638 2.978-6.638 6.638 0 3.661 2.978 6.638 6.638 6.638 1.659 0 3.174-.616 4.339-1.626l4.188 3.779c.096.086.216.129.335.129.137 0 .272-.056.371-.165.186-.204.169-.521-.036-.705zm-14.835-8.05c0-3.109 2.529-5.638 5.638-5.638s5.638 2.529 5.638 5.638-2.529 5.638-5.638 5.638-5.638-2.529-5.638-5.638z"/></svg>', '</a>'].join(''),
    transclude: true,
    link: function(scope, elem) {
      return elem.on('click touchend', function() {
        elem.toggleClass('active');
        return scope.toggled = scope.toggled === true ? false : true;
      });
    }
  };
};

a = function() {
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
};

dropdown = function() {
  return {
    link: function(scope, elem) {
      return elem.on('mouseover mouseout', function() {
        return elem.toggleClass('is-active');
      });
    }
  };
};

focusClass = function() {
  return {
    link: function(scope, elem) {
      return elem.on('focus blur', function() {
        return elem.toggleClass('is-focus').parent().toggleClass('is-focus');
      });
    }
  };
};

angular.module('app.directives', []).directive('toggle', toggle).directive('a', a).directive('dropdown', dropdown).directive('focusClass', focusClass);

angular.module('app.home', ['userFeed']).controller('HomeController', [
  '$scope', 'feed', function($scope, feed) {
    feed.getFeed().then(function(response) {
      $scope.posts = response.data.feed;
      return console.log($scope.posts);
    });
    $scope.text = "Expand";
    $scope.expanded = false;
    return $scope.toggleComments = function() {
      $scope.text = $scope.expanded ? "Expand" : "Collapse";
      return $scope.expanded = $scope.expanded ? false : true;
    };
  }
]);

var postedOn;

postedOn = function() {
  return {
    restrict: 'AE',
    template: '<time datetime="{{posted}}">{{formattedDate}}</time>',
    replace: true,
    scope: {
      posted: "="
    },
    link: function($scope) {
      return $scope.formattedDate = moment($scope.posted).twitterShort();
    }
  };
};

angular.module('app.home.directives', []).directive('postedOn', postedOn);

angular.module('userFeed', []).factory('feed', [
  '$http', function($http) {
    var factory;
    factory = {};
    factory.getFeed = function() {
      return $http.get('data/feed.json').success(function(response) {
        return response.feed;
      });
    };
    return factory;
  }
]);

angular.module('app.settings', ['settings.Service']).controller('SettingsController', [
  '$scope', 'settings', function($scope, settings) {
    return settings.getSettings().then(function(response) {
      $scope.user = response.data.settings.user;
      $scope.notifications = response.data.settings.notifications;
      return $scope.options = response.data.settings.privacy;
    });
  }
]);

var optionsCheckbox, optionsToggle;

optionsToggle = function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      label: "=",
      val: "=",
      id: "="
    },
    template: '<div class="toggle"> <input class="toggle_input" id="{{id}}" name="{{id}}" type="checkbox" ng-checked="{{val}}"/> <label class="toggle_handle" for="{{id}}"></label> <label class="toggle_label" for="{{id}}">{{label}}</label> </div>'
  };
};

optionsCheckbox = function() {
  return {
    restrict: 'E',
    replace: true,
    template: ''
  };
};

angular.module('app.settings.directives', []).directive('optionsToggle', optionsToggle).directive('optionsCheckbox', optionsCheckbox);

angular.module('settings.Service', []).factory('settings', [
  '$http', function($http) {
    var setting;
    setting = {};
    setting.getSettings = function() {
      return $http.get('data/settings.json').success(function(response) {
        return response.settings;
      });
    };
    return setting;
  }
]);
