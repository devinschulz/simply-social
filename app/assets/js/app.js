'use strict';
angular.module('app', ['ngRoute', 'ngSanitize', 'monospaced.elastic', 'taiPlaceholder', 'app.directives', 'app.header', 'app.header.directives', 'app.modal', 'app.modal.directives', 'app.home', 'app.home.filters', 'app.home.directives', 'app.settings', 'app.settings.directives']).config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    return $routeProvider.when('/', {
      title: 'Posts',
      templateUrl: 'views/home.html',
      controller: 'HomeController'
    }).when('/settings', {
      title: 'Settings',
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
]).run([
  '$location', '$rootScope', function($location, $rootScope) {
    return $rootScope.$on('$routeChangeSuccess', function(event, current, previous) {
      return $rootScope.title = current.$$route.title;
    });
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

var a, focusClass;

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

focusClass = function() {
  return {
    link: function(scope, elem) {
      return elem.on('focus blur', function() {
        return elem.toggleClass('is-focus').parent().toggleClass('is-focus');
      });
    }
  };
};

angular.module('app.directives', []).directive('a', a).directive('focusClass', focusClass);

var HeaderController;

HeaderController = [
  '$scope', '$rootScope', 'ModalService', function($scope, $rootScope, ModalService) {
    return $scope.openModal = function(event) {
      event.preventDefault();
      return ModalService.showModal({
        templateUrl: "views/modal/modal.html",
        controller: "ModalController"
      }).then(function() {
        return $rootScope.modalOpen = true;
      });
    };
  }
];

angular.module('app.header', ['angularModalService']).controller('HeaderController', HeaderController);

var dropdown, toggle;

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

dropdown = function() {
  return {
    link: function(scope, elem) {
      return elem.on('mouseover mouseout', function() {
        return elem.toggleClass('is-active');
      });
    }
  };
};

angular.module('app.header.directives', []).directive('toggle', toggle).directive('dropdown', dropdown);

var HomeController;

HomeController = [
  '$scope', 'feed', '$sce', function($scope, feed, $sce) {
    var i, _i, _len, _ref;
    feed.getFeed().then(function(response) {
      return $scope.posts = response.data.feed;
    });
    $scope.text = "Expand";
    $scope.expanded = false;
    $scope.toggleComments = function(repeaterScope) {
      repeaterScope.text = repeaterScope.expanded ? "Expand" : "Collapse";
      return repeaterScope.expanded = repeaterScope.expanded ? false : true;
    };
    $scope.filters = feed.sortLabels();
    $scope.setSelected = function(elem) {
      $scope.selected = elem;
      return $scope.show = elem.type;
    };
    $scope.isSelected = function(elem) {
      return $scope.selected === elem;
    };
    $scope.setSelected($scope.filters[0]);
    $scope.views = feed.sortType();
    _ref = $scope.views;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      i.icon = $sce.trustAsHtml(i.icon);
    }
    $scope.setSelectedLayout = function(elem) {
      return $scope.selectedLayout = elem;
    };
    $scope.isSelectedLayout = function(elem) {
      return $scope.selectedLayout === elem;
    };
    return $scope.setSelectedLayout($scope.views[0]);
  }
];

angular.module('app.home', ['userFeed']).controller('HomeController', HomeController);

var bar, postedOn;

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

bar = [
  '$timeout', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var setLocation, underline;
        underline = document.createElement('div');
        underline.className = 'bar';
        elem.append(underline);
        setLocation = function(elem) {
          var left, width;
          console.log(elem);
          left = elem[0].offsetLeft;
          width = elem[0].offsetWidth;
          underline.style.left = "" + left + "px";
          return underline.style.width = "" + width + "px";
        };
        elem.children('li').bind('click', function(e) {
          console.log(e);
          if (angular.element(e.currentTarget).hasClass('is-active')) {
            return;
          }
          return setLocation(angular.element(e.currentTarget));
        });
        return setLocation(elem.children("li.is-active"));
      }
    };
  }
];

angular.module('app.home.directives', []).directive('postedOn', postedOn).directive('bar', bar);


/*
Sort Post by Category
@return object
 */
var PostSortFilter;

PostSortFilter = function() {
  return function(items, category) {
    var categoryArray, x, y, _i, _j, _len, _len1;
    if (!angular.isUndefined(items) && !angular.isUndefined(category) && category.length) {
      categoryArray = [];
      if (category === "all") {
        return items;
      } else if (category === "photos") {
        for (_i = 0, _len = items.length; _i < _len; _i++) {
          y = items[_i];
          if (y.thumbnail && y.video === false) {
            categoryArray.push(y);
          }
        }
        return categoryArray;
      } else if (category === "videos") {
        for (_j = 0, _len1 = items.length; _j < _len1; _j++) {
          x = items[_j];
          if (x.video) {
            categoryArray.push(x);
          }
        }
        return categoryArray;
      } else {
        return items;
      }
    } else {
      return items;
    }
  };
};

angular.module('app.home.filters', []).filter('PostSortFilter', PostSortFilter);

var feed;

feed = [
  '$http', function($http) {
    feed = {};
    feed.getFeed = function() {
      return $http.get('data/feed.json').success(function(response) {
        return response.feed;
      });
    };
    feed.sortLabels = function() {
      return [
        {
          "label": "All Posts",
          "title": "View all posts",
          "type": "all"
        }, {
          "label": "Photos",
          "title": "View posts containing only photos",
          "type": "photos"
        }, {
          "label": "Videos",
          "title": "View posts containing only videos",
          "type": "videos"
        }
      ];
    };
    feed.sortType = function() {
      return [
        {
          "title": "Show posts as a list",
          "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 9 9\" enable-background=\"new 0 0 9 9\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 9h9v-1h-9v1zm0-9v1h9v-1h-9zm0 5h9v-1h-9v1z\"/></svg>"
        }, {
          "title": "Show posts as a grid",
          "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 9 9\" enable-background=\"new 0 0 9 9\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 9h3v-3h-3v3zm6 0h3v-3h-3v3zm-6-6h3v-3h-3v3zm6-3v3h3v-3h-3z\"/></svg>"
        }
      ];
    };
    return feed;
  }
];

angular.module('userFeed', []).factory('feed', feed);

var ModalController;

ModalController = [
  '$scope', '$timeout', '$rootScope', 'close', function($scope, $timeout, $rootScope, close) {
    var open;
    open = function() {
      return $scope.open = $scope.open === true ? false : true;
    };
    $timeout(open, 200);
    return $scope.closeModal = function() {
      $rootScope.modalOpen = false;
      $timeout(open, 0);
      return close({}, 1000);
    };
  }
];

angular.module('app.modal', ['angularModalService']).controller('ModalController', ModalController);

var focus;

focus = [
  '$timeout', function($timeout) {
    return {
      link: function(scope, elem) {
        return $timeout(function() {
          return elem[0].focus();
        });
      }
    };
  }
];

angular.module('app.modal.directives', []).directive('focus', focus);

var SettingsCtrl;

SettingsCtrl = [
  '$scope', 'settings', function($scope, settings) {
    return settings.getSettings().then(function(response) {
      $scope.user = response.data.settings.user;
      $scope.notifications = response.data.settings.notifications;
      return $scope.options = response.data.settings.privacy;
    });
  }
];

angular.module('app.settings', ['settings.Service']).controller('SettingsController', SettingsCtrl);

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

var settings;

settings = [
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
];

angular.module('settings.Service', []).factory('settings', settings);
