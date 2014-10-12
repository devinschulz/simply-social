# Toggle search on mobile devices
toggle = () ->
  restrict: 'EA'
  template: [
    '<a href="#" class="search_trigger" title="Toggle search">'
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 15.559" enable-background="new 0 0 16 15.559"><path fill="#231F20" d="M15.835 14.688l-4.151-3.746c.991-1.16 1.593-2.661 1.593-4.303-.001-3.661-2.978-6.639-6.639-6.639-3.66 0-6.638 2.978-6.638 6.638 0 3.661 2.978 6.638 6.638 6.638 1.659 0 3.174-.616 4.339-1.626l4.188 3.779c.096.086.216.129.335.129.137 0 .272-.056.371-.165.186-.204.169-.521-.036-.705zm-14.835-8.05c0-3.109 2.529-5.638 5.638-5.638s5.638 2.529 5.638 5.638-2.529 5.638-5.638 5.638-5.638-2.529-5.638-5.638z"/></svg>'
    '</a>'
  ].join('')
  transclude: true
  link: (scope, elem) ->
    elem.on 'click touchend', ->
      elem.toggleClass('active')
      scope.toggled = if scope.toggled is true then false else true

# Prevent reloading since most of the links in
# this demo lead to nowhere
a = () ->
  restrict: 'E'
  link: (scope, elem, attrs) ->
    if attrs.ngClick or attrs.href == '' or attrs.href is '#'
      elem.on 'click', (e) ->
        e.preventDefault()

# Toggle class to allow dropdown toggle to
# transition properly
dropdown = () ->
  link: (scope, elem) ->
    elem.on 'mouseover mouseout', ->
      elem.toggleClass('is-active')

focusClass = () ->
  link: (scope, elem) ->
    elem.on 'focus blur', ->
      elem.toggleClass('is-focus').parent('form').toggleClass('is-focus')


angular.module 'app.directives', []
.directive 'toggle', toggle
.directive 'a', a
.directive 'dropdown', dropdown
.directive 'focusClass', focusClass

