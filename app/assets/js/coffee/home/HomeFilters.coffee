PostSortFilter = ->
  (items, category) ->
    if !angular.isUndefined(items) && !angular.isUndefined(category) && category.length
      categoryArray = []
      if category is "all"
        return items
      else if category is "photos"
        for y in items
          if y.thumbnail and y.video is false then categoryArray.push(y)
        return categoryArray
      else if category is "videos"
        for x in items
          if x.video then categoryArray.push(x)
        return categoryArray
      else
        return items
    else
      return items

angular
  .module 'app.home.filters', []
  .filter 'PostSortFilter', PostSortFilter