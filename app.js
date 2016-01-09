'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.register',
  'myApp.welcome',
  'myApp.addPost',
  'myApp.test',
  'myApp.contacto'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
		.when('/welcome', {
            title: 'Bienvenido',
	        templateUrl: 'welcome/welcome.html',
	        controller: 'WelcomeCtrl'
    	})
		.when('/contacto', {
            title: 'Contacto',
            templateUrl: 'contacto/contacto.html',
            controller: 'contactoCtrl'
        })
		.otherwise({redirectTo: '/home'});
}])
.controller('headCrtl', ['$scope', '$firebase','$location', 'CommonProp', function($scope, $firebase, $location ,CommonProp) {

    $scope.logout = function(){
    CommonProp.logoutUser();
    }

}]);