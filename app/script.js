// script.js

    'use strict';

    // create the module and name it scotchApp
    angular.module('pitsApp', [ 
        'ngRoute'
    ])
    // configure our routes
    .config(['$routeProvider', function($routeProvider) {
     // Routes will be here
        $routeProvider
            // route for the home page
            .when('/', {
                templateUrl : 'app/views/main.html',
                controller  : 'mainController'
            });
    }])
    // create the controller and inject Angular's $scope
    .controller('mainController', function($scope) {
        // create a message to display in our view
        var vm = this;

        activate();
        
        function activate() {
            $('#btn_tipo_1').click(function() {
                $('#map').show();
                $('#listado').hide();
                $('.mobile-menu').css('background-color', 'transparent');
                google.maps.event.trigger(map, "resize");
            });
            $('#btn_tipo_2').click(function() {
                $('#map').hide();
                $('#listado').show();
                $('.mobile-menu').css('background-color', 'white');
            });


        }

        $scope.message = 'Testing';
    });
