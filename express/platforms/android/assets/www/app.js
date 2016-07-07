'use strict';

angular.module('myApp', [
  'ngRoute','firebase','uiGmapgoogle-maps'
])
.controller('mainCtrl', ['$scope', '$firebase' ,function($scope, $firebase) {

	$scope.username = "admin@laparrillaexpress.com";

    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos/");
    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));
    $scope.platillos = sync.$asArray();

    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Pastas/");
    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));
    $scope.pastas = sync.$asArray();


    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Sopas/");
    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));
    $scope.sopas = sync.$asArray();


    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Aguas/");
    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));
    $scope.aguas = sync.$asArray();

    var suscripcion = {}
    $scope.suscripcion = suscripcion; 

    $scope.Suscribir = function(){

        suscripcion.loading = true;
        var email = $scope.suscripcion.email;

        var user = $scope.username;
        
        var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Suscriptores/");
        var fb = $firebase(firebaseObj);
        fb.$push({ 
            email: email,
            emailId: user,
            '.priority': user
        }).then(function(ref) {
            suscripcion.loading = false;
            alert('¡Registrado!');
            $scope.suscripcion.email = "";
        }, function(error) {
            suscripcion.loading = false;
            console.log("Error:", error);
        });
    }

	$scope.map = { center: { latitude: 19.6991858, longitude: -103.4637433 }, zoom: 18 };

}]);

