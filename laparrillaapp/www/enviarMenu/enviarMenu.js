'use strict';

angular.module('myApp.enviarMenu', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/enviarMenu', {
    templateUrl: 'enviarMenu/enviarMenu.html',
    controller: 'EnviarMenuCtrl'
  });
}])

.controller('EnviarMenuCtrl', ['$scope','$firebase','$location','CommonProp','$http',function($scope,$firebase,$location,CommonProp,$http) {
	
	$scope.username = CommonProp.getUser();

    if(!$scope.username){
        $location.path('/home');
    }


    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos/");
    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));
    $scope.platillos = sync.$asArray();
    console.log(sync);

    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Pastas/");
    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));
    $scope.pastas = sync.$asArray();
    console.log(sync);


    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Sopas/");
    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));
    $scope.sopas = sync.$asArray();
    console.log(sync);


    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Aguas/");
    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));
    $scope.aguas = sync.$asArray();
    console.log(sync);



    //inicializo un objeto
    var suscriptores = {}

    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Suscriptores/");
    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));
    $scope.suscriptores = sync.$asArray();
    
    suscriptores.data = {
    	"suscriptores": $scope.suscriptores,
    	"sopas": $scope.sopas,
    	"aguas": $scope.aguas,
    	"pastas": $scope.pastas,
    	"platillos": $scope.platillos,
   
    }

    $scope.confirmDeleteSuscriptor = function(id) {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Suscriptores/" + id);
        var suscriptor = $firebase(fb);
        $scope.suscriptorToDelete = suscriptor.$asObject();
        $('#deleteModalSuscriptor').openModal();
    }

    $scope.deleteSuscriptor = function() {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Suscriptores/" + $scope.suscriptorToDelete.$id);
        var suscriptor = $firebase(fb);
        suscriptor.$remove().then(function(ref) {
            $('#deleteModalSuscriptor').closeModal();
        }, function(error) {
            console.log("Error:", error);
        });
    }

	$scope.enviarMenu = function(){
        var Ajax = $http.post("http://www.aidihosting.com/proyectos/laparrillaexpress/php/envia_menu.php", suscriptores);
        //var Ajax = $http.post("http://localhost/express/express/cexpress/www/php/envia_menu.php", suscriptores);
		Ajax.success(function(respuesta){
		     console.log(respuesta);
             alert("Mensaje enviado");
		});

	}





}]);

