
function AutoFocus($timeout) {
  return {
    restict: 'AE',
    link: function($scope, $element, $attr) {
      console.log('modal!');
      $timeout(function() {
        element[0].focus();
      }, 0);
      console.log('sdasdasd');
    }
  }
}

angular
  .module('app')
  .directive('Focus', AutoFocus);
