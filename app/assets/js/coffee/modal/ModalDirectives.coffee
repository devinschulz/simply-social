focus = ($timeout) ->
  link: (scope, elem) ->
    $timeout ->
      elem[0].focus()

angular
  .module 'app.modal.directives', []
  .directive 'focus', focus