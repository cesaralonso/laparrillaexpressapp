'use strict';

angular.module('myApp', [
  'ngRoute','firebase','uiGmapgoogle-maps'
])
.controller('mainCtrl', ['$scope', '$firebase' ,function($scope, $firebase) {

	$scope.username = "admin@laparrillaexpress.com";
    
    var platillosFb = [];

/*    
    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos/");
    var query = firebaseObj.startAt($scope.username).endAt($scope.username);
    query.on("child_added", function(snapshot) {
        var platillo = snapshot.val();

        if (platillo.activo == true) {
           console.log(platillo);
           platillosFb.push(platillo);
        }
    });
    $scope.platillos = platillosFb;

*/
    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos/");
    var count = 0;
    var query = firebaseObj.startAt($scope.username).endAt($scope.username);
    /**/



    query.on("child_added", function(snap) {
        var platillo = snap.val();
        if (platillo.activo == true) {
            count++;
            console.log(count);

            platillosFb.push(platillo);
        }
    });

    $scope.platillos = platillosFb;



    var pastasFb = [];
    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Pastas/");
    var query = firebaseObj.startAt($scope.username).endAt($scope.username);
    query.on("child_added", function(snapshot) {
        var pasta = snapshot.val();

        if (pasta.activo == true) {
           console.log(pasta);
           pastasFb.push(pasta);
        }
    });
    $scope.pastas = pastasFb;


    var sopasFb = [];
    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Sopas/");
    var query = firebaseObj.startAt($scope.username).endAt($scope.username);
    query.on("child_added", function(snapshot) {
        var sopa = snapshot.val();
        if (sopa.activo == true) {
           console.log(sopa);
           sopasFb.push(sopa);
        }
    });
    $scope.sopas = sopasFb;


    var aguasFb = [];
    var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Aguas/");
    var query = firebaseObj.startAt($scope.username).endAt($scope.username);
    query.on("child_added", function(snapshot) {
        var agua = snapshot.val();
        if (agua.activo == true) {
           console.log(agua);
           aguasFb.push(agua);
        }
    });
    $scope.aguas = aguasFb;


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

