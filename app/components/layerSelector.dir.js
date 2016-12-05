pitsApp.directive('layerSelector', function() {
  return {
    restrict: 'AE',
    replace: 'true',
    templateUrl: '/app/views/layerSelector.html',
    scope: {
        selected: '=',
        selectfn: '&',
        mobile: '='
    }
  };
});