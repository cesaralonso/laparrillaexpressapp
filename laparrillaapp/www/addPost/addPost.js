'use strict';

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/addPost', {
    templateUrl: 'addPost/addPost.html',
    controller: 'AddPostCtrl'
  });
}])

.controller('AddPostCtrl', ['$scope','$firebase','$location','CommonProp',function($scope,$firebase,$location,CommonProp) {
     
	if(!CommonProp.getUser()){
	    $location.path('/home');
	}

     var platillo={};
	$scope.platillo=platillo;

     var pasta={};
	$scope.pasta=pasta;

     var sopa={};
	$scope.sopa=sopa;

     var agua={};
	$scope.agua=agua;


	$scope.logout = function(){
	    CommonProp.logoutUser();
	}

    $scope.AddPlatillo = function(){
		platillo.loading = true;
		var title = $scope.platillo.title;
	    var description = $scope.platillo.description;
	    var tipo = $scope.platillo.tipo;
		
		var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos");
	    var fb = $firebase(firebaseObj);
	        
		var user = CommonProp.getUser();

		fb.$push({ 
			title: title,
			description: description,
			emailId: user,
			tipo:tipo,
			'.priority': user
		}).then(function(ref) {
			platillo.loading = false;
			//$location.path('/welcome');
			alert('Ok!');
			$scope.platillo.title = "";
		    $scope.platillo.description = "";
		    $scope.platillo.tipo = "";
		}, function(error) {
			platillo.loading = false;
	  		console.log("Error:", error);
		});

    }


    $scope.AddPasta = function(){
		pasta.loading = true;
		var title = $scope.pasta.title;
	    var description = $scope.pasta.description;
		
		var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Pastas");
	    var fb = $firebase(firebaseObj);
	        
		var user = CommonProp.getUser();

		fb.$push({ 
			title: title,
			description: description,
			emailId: user,
			'.priority': user
		}).then(function(ref) {
			pasta.loading = false;
			//$location.path('/welcome');
			alert('Ok!');
			$scope.pasta.title = "";
		    $scope.pasta.description = "";
		}, function(error) {
			pasta.loading = false;
	  		console.log("Error:", error);
		});

    }

    $scope.AddSopa = function(){
		sopa.loading = true;
		var title = $scope.sopa.title;
	    var description = $scope.sopa.description;
		
		var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Sopas");
	    var fb = $firebase(firebaseObj);
	        
		var user = CommonProp.getUser();

		fb.$push({ 
			title: title,
			description: description,
			emailId: user,
			'.priority': user
		}).then(function(ref) {
			sopa.loading = false;
			//$location.path('/welcome');
			alert('Ok!');
			$scope.sopa.title = "";
		    $scope.sopa.description = "";
		}, function(error) {
			sopa.loading = false;
	  		console.log("Error:", error);
		});

    }

    $scope.AddAgua = function(){
		agua.loading = true;
		var title = $scope.agua.title;
	    var description = $scope.agua.description;
		
		var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Aguas");
	    var fb = $firebase(firebaseObj);
	        
		var user = CommonProp.getUser();

		fb.$push({ 
			title: title,
			description: description,
			emailId: user,
			'.priority': user
		}).then(function(ref) {
			agua.loading = false;
			//$location.path('/welcome');
			alert('Ok!');
			$scope.agua.title = "";
		    $scope.agua.description = "";
		}, function(error) {
			agua.loading = false;
	  		console.log("Error:", error);
		});

    }
}]);

