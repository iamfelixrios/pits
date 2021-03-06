// script.js

    'use strict';

    // create the module and name it scotchApp
    var pitsApp = angular.module('pitsApp', [ 
        'ngRoute', 'ngSanitize'
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
    .controller('mainController', mainController); 
    
mainController.inject = ['$http'];
    
function mainController($http) {
    // create a message to display in our view
    var vm = this;

    vm.modo = 'mapa';

    // Funciones visibles desde la vista
    vm.updateLayer = updateLayer;
    vm.toggleSideDesktop = toggleSideDesktop;
    vm.setFilters = setFilters;
    vm.submit = submit;

    var prev_markers = [];
    var dataMapa = {};
    vm.setANames = [];
    vm.setBNames = [];

    vm.distritos = [];
    vm.categorias = [];
    vm.currentSearch = '';
    vm.itemList = [];

    // Default map settings
    vm.center = {lat: 41.386122276956, lng: 2.1871691182577};
    vm.zoom = 13;


    window.initMap = function() {
        vm.map = new google.maps.Map(document.getElementById('map'), {
            center: vm.center,
            zoom: vm.zoom,
            mapTypeControl: false,
        });
    }

    activate();

    function activate() {

        var s = document.createElement('script');
                s.src = '//maps.googleapis.com/maps/api/js?key=AIzaSyDwYcxFqTMGl7mxngEtKIufHZAx_BWEbbo&callback=initMap';
                document.body.appendChild(s);

        $http.get("vmpits.json").then(function (response) {
           dataMapa = response.data;
           dataMapa.markers = [];
           vm.icons = dataMapa.icons;
           vm.setANames = dataMapa.setANames;
           vm.setBNames = dataMapa.setBNames;           
           vm.doneLoad = true;
           vm.center = dataMapa.settings.center;
           vm.zoom = dataMapa.settings.zoom;

           if (vm.map) {
               vm.map.setCenter(vm.center);
               vm.map.setZoom(vm.zoom);
            };
           
           $('.loadingLayer').hide();
        });    
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
            google.maps.event.trigger(vm.map, "resize");
        } else {
            $('.btn_tipo_2').each(function() {
                $(this).prop('checked', true);
            });
            $('#map').hide();
            $('#listado').show();
            $('.mobile-menu').css('background-color', 'white');
        }
    }



    // Go and do the search


    // Collapse/Expand sidemenu on desktop
    function toggleSideDesktop() {
        $('.hideable-desktop-boxes').each(function() {
            $(this).toggle();
        });
    }

    // Update filters
    function setFilters(distritos, categorias) {
        vm.distritos = distritos;
        vm.categorias = categorias;
    }

    // Refresh search on map 
    function submit(query) {
        var queryFinal = '';

        if (query) {
            queryFinal = query;
        } else {
            queryFinal = vm.currentSearch;
        }
        var layer = pitsQuery(dataMapa, vm.distritos, vm.categorias, queryFinal);

        if ( vm.prev_markers ) {
            clearLayer(vm.prev_markers);
        }
        vm.itemList = layer.list;
        vm.prev_markers = layer.markers;                        
        setMapOnAll(vm.map, layer.markers);    

    }

}

