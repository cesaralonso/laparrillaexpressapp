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


    $scope.editPost = function(id) {
        console.log(id);
        var firebaseObj = new Firebase("https://blistering-heat-2473.firebaseio.com/Articles/" + id);


        var syn = $firebase(firebaseObj);
        $scope.postToUpdate = syn.$asObject();

        $('#editModal').modal();
    }

    $scope.update = function() {
        console.log($scope.postToUpdate.$id);
        var fb = new Firebase("https://blistering-heat-2473.firebaseio.com/Articles/" + $scope.postToUpdate.$id);
        var article = $firebase(fb);
        article.$update({
            title: $scope.postToUpdate.title,
            post: $scope.postToUpdate.post,
            emailId: $scope.postToUpdate.emailId
        }).then(function(ref) {
            console.log(ref.key()); // bar
            $('#editModal').modal('hide')
        }, function(error) {
            console.log("Error:", error);
        });

    }


    $scope.confirmDelete = function(id) {
        var fb = new Firebase("https://blistering-heat-2473.firebaseio.com/Articles/" + id);
        var article = $firebase(fb);
        $scope.postToDelete = article.$asObject();
        $('#deleteModal').modal();
    }

    $scope.deletePost = function() {
        var fb = new Firebase("https://blistering-heat-2473.firebaseio.com/Articles/" + $scope.postToDelete.$id);
        var article = $firebase(fb);
        article.$remove().then(function(ref) {
            $('#deleteModal').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }

}]);