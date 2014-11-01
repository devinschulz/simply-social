/**
 * Wrapper for the underscore.js Library. This will
 * allow you inject underscores as a dependency
 *
 * @returns {Window._}
 */
angular.module('underscore', [])
  .factory('_', Underscore);

function Underscore() {
  return window._;
}