// script.js

    'use strict';

    // create the module and name it scotchApp
    var pitsApp = angular.module('pitsApp', [ 
        'ngRoute'
    ])
    // configure our routes
    .config(['$routeProvider', function($routeProvider) {
     // Routes will be here
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'app/views/main.html',
                controller  : 'mainController',
                controllerAs: 'vm'
            });
    }])
    // create the controller and inject Angular's $scope
    .controller('mainController', [ 'geoDataService', function($scope, geoDataService) {
        // create a message to display in our view
        var vm = this;

        vm.modo = 'mapa';
        vm.updateLayer = updateLayer;
        vm.toggleSearch = toggleSearch;
        vm.toggleSideDesktop = toggleSideDesktop;

        vm.searchOpen = false;
        vm.searchString = '';
        
        activate();

        function activate() {
            geoDataService.loadData();
        }

        // Cambia de capa Mapa a capa Listado
        function updateLayer() {
            if (vm.modo === 'mapa') {
                vm.modo = 'listado';
            } else {
                vm.modo = 'mapa';
            }

            if (vm.modo === 'mapa') {
                $('.btn_tipo_1').each(function() {
                    $(this).prop('checked', true);
                });
                $('#map').show();
                $('#listado').hide();
                $('.mobile-menu').css('background-color', 'transparent');
                google.maps.event.trigger(window.map, "resize");
            } else {
                $('.btn_tipo_2').each(function() {
                    $(this).prop('checked', true);
                });
                $('#map').hide();
                $('#listado').show();
                $('.mobile-menu').css('background-color', 'white');
            }
        }

        // Toggle search on desktop
        function toggleSearch() {
            if (vm.searchOpen) {
                if (vm.searchString.length < 1) {
                    $('#search-to-hide').toggle();
                    $('#filter-to-hide').toggle();    
                    vm.searchOpen = !vm.searchOpen;          
                } else {
                    // buscar
                    alert('buscando');
                }                
            } else {
                $('#search-to-hide').toggle();
                $('#filter-to-hide').toggle();              
                vm.searchOpen = !vm.searchOpen;          
            }
        }

        // Collapse/Expand sidemenu on desktop
        function toggleSideDesktop() {
            $('.hideable-desktop-boxes').each(function() {
                $(this).toggle();
            });
        }

    }]);

