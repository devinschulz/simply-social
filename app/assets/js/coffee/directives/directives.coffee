# Prevent reloading since most of the links in
# this demo lead to nowhere
a = ->
  restrict: 'E'
  link: (scope, elem, attrs) ->
    if attrs.ngClick or attrs.href == '' or attrs.href is '#'
      elem.on 'click', (e) ->
        e.preventDefault()

focusClass = ->
  link: (scope, elem) ->
    elem.on 'focus blur', ->
      elem.toggleClass('is-focus').parent().toggleClass('is-focus')


angular
  .module 'app.directives', []
  .directive 'a', a
  .directive 'focusClass', focusClass

