pitsApp.controller('SideMenuCtrl', sideMenuCtrl); 
    
sideMenuCtrl.inject = ['$scope'];
    
function sideMenuCtrl($scope) {

    $scope.updateFilters = updateFilters;
    $scope.toggleSearch = toggleSearch;
    $scope.clearFilters = clearFilters;

    $scope.searchOpen = false;
    $scope.searchString = '';
    
    function gatherDistricts() {
        var resultado = [];

        $('.district-check:checked').each(function() {
            resultado.push(parseInt($(this).val()));
        })
        return resultado;
    }

    // Toggle search on desktop
    function toggleSearch() {
        if ($scope.searchOpen) {
            if ($scope.searchString.length < 1) {
                $('#search-to-hide').toggle();
                $('#filter-to-hide').toggle();    
                $scope.searchOpen = !$scope.searchOpen;          
            } else {
                // buscar
                $scope.searchfn({query: $scope.searchString});
            }                
        } else {
            $('#search-to-hide').toggle();
            $('#filter-to-hide').toggle();              
            $scope.searchOpen = !$scope.searchOpen;          
        }
    }

    function gatherCategories() {
        var resultado = [];

        $('.category-check:checked').each(function() {
            resultado.push(parseInt($(this).val()));
        })
        return resultado;
    }

    function updateFilters() {
        $scope.filtersfn(
            {
                distritos: gatherDistricts(),
                categorias: gatherCategories(),
            }
        );
        if ($scope.mobile) closeNav();
    }

    function clearFilters() {
        $('.district-check:checked').each(function() {
            $(this).prop("checked", false);
        });
        $('.category-check:checked').each(function() {
            $(this).prop("checked", false);
        });
        $scope.filtersfn(
            {
                distritos: [],
                categorias: [],
            }
        );
        if ($scope.mobile) closeNav();
    }
}