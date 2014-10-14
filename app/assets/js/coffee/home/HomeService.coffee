feed = ['$http', ($http) ->
  feed = {}
  feed.getFeed = ->
    $http.get('data/feed.json').success (response) ->
      return response.feed

  feed.sortLabels = ->
    return [
      {
        "label": "All Posts"
        "title": "View all posts"
        "type": "all"
      }, {
        "label": "Photos"
        "title": "View posts containing only photos"
        "type": "photos"
      }, {
        "label": "Videos"
        "title": "View posts containing only videos"
        "type": "videos"
      }
    ]
  feed.sortType = ->
    return [
      {
        "title": "Show posts as a list"
        "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 9 9\" enable-background=\"new 0 0 9 9\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 9h9v-1h-9v1zm0-9v1h9v-1h-9zm0 5h9v-1h-9v1z\"/></svg>"
      }, {
        "title": "Show posts as a grid"
        "icon": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 9 9\" enable-background=\"new 0 0 9 9\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 9h3v-3h-3v3zm6 0h3v-3h-3v3zm-6-6h3v-3h-3v3zm6-3v3h3v-3h-3z\"/></svg>"
      }
    ]

  return feed
]

angular
  .module 'userFeed', []
  .factory 'feed', feed