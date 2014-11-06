(function() {

  "use strict";

  /**
   * Fetch User Feed
   *
   * @param $http
   * @returns {{getFeed: Function, sortLabels: Function, sortType: Function}}
   */
  function FeedFactory($http) {

    FeedFactory.posts = {};

    FeedFactory.sortLabels = function() {
      return [{
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
      }];
    };

    FeedFactory.sortType = function() {
      return [{
        "title": "Show posts as a list",
        "type": "list",
        "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 9 9\" enable-background=\"new 0 0 9 9\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 9h9v-1h-9v1zm0-9v1h9v-1h-9zm0 5h9v-1h-9v1z\"/></svg>"
      }, {
        "title": "Show posts as a grid",
        "type": "grid",
        "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 9 9\" enable-background=\"new 0 0 9 9\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 9h3v-3h-3v3zm6 0h3v-3h-3v3zm-6-6h3v-3h-3v3zm6-3v3h3v-3h-3z\"/></svg>"
      }];
    };

    FeedFactory.getFeed = function() {
      return $http.get('data/feed.json')
        .success(function (data) {
          var posts = data.feed;

          // Add Default data
          for (var i = 0; i < posts.length; i++) {
            posts[i].text = "Expand";
            posts[i].expanded = false;
          }
          FeedFactory.posts = posts;
        }).error(function (error) {
          console.log(error);
        });
    };

    return FeedFactory;
  }

  angular
    .module('app')
    .factory('FeedFactory', FeedFactory);

})();