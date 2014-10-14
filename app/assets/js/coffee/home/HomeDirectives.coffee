postedOn = ->
  restrict: 'AE'
  template: '<time datetime="{{posted}}">{{formattedDate}}</time>'
  replace: true
  scope:
    posted: "="
  link: ($scope) -> $scope.formattedDate = moment($scope.posted).twitterShort()

angular
  .module 'app.home.directives', []
  .directive 'postedOn', postedOn