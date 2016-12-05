pitsApp.directive('sideMenu', function() {
  return {
      restrict: 'AE',
      replace: 'true',
      templateUrl: '/app/views/sideMenu.html',
      controller: 'sideMenuCtrl',
      scope: {
          mobile: '=',
          searchfn: '&',
          togglemainfn: '&',
          selectedlayer: '=',
          selectlayerfn: '&',
          seticons: '=',
          setanames: '=',
          setbnames: '=',
          filtersfn: '&'
    }
  };
});
