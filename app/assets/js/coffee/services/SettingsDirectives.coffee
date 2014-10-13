optionsToggle = ->
  restrict: 'E'
  replace: true
  scope:
    label: "="
    val: "="
    id: "="
  template: '<div class="toggle">
              <input class="toggle_input" id="{{id}}" name="{{id}}" type="checkbox" ng-checked="{{val}}"/>
              <label class="toggle_handle" for="{{id}}"></label>
              <label class="toggle_label" for="{{id}}">{{label}}</label>
            </div>'

optionsCheckbox = ->
  restrict: 'E'
  replace: true
  template: ''

angular.module 'app.settings.directives', []

.directive 'optionsToggle', optionsToggle
.directive 'optionsCheckbox', optionsCheckbox