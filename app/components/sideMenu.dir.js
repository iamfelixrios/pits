pitsApp.directive('sideMenu', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: '/app/views/sideMenu.html',
      scope: {
          mobile: '=',
          searchfn: '&',
          togglefn: '&',
          togglemainfn: '&',
          selectedlayer: '=',
          selectlayerfn: '&'
    }
  };
});
