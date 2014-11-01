function Masonry($timeout) {
  return{
    compile: function($scope, $element, $attrs) {
      $element.addClass('masonry');
      $timeout(function() {
        $element.masonry();
      });
    }
  }
}

angular
  .module('app')
  .directive('Masonry', Masonry);