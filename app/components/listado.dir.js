pitsApp.directive('listadoLocations', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: '/app/views/listado.html',
      scope: {
          items: '=',
    }
  };
});