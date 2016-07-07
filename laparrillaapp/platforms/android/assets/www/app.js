'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.register',
  'myApp.welcome',
  'myApp.addPost',
  'myApp.enviarMenu'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider
		.when('/welcome', {
            title: 'Bienvenido',
	        templateUrl: 'welcome/welcome.html',
	        controller: 'WelcomeCtrl'
    	})
		.otherwise({redirectTo: '/home'});
}])
.controller('headCrtl', ['$scope', '$firebase','$location', 'CommonProp', function($scope, $firebase, $location ,CommonProp) {

    $scope.logout = function(){
      CommonProp.logoutUser();
    }

}]);