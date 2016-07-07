'use strict';

angular.module('myApp.welcome', ['ngRoute'])


.controller('WelcomeCtrl', ['$scope', '$firebase','$location', 'CommonProp', function($scope, $firebase, $location ,CommonProp) {
    $scope.username = CommonProp.getUser();

    $scope.CurrentDate = new Date();

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



    // Platillos

    $scope.editPlatillo = function(id) {
        console.log(id);
        var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos/" + id);
        var syn = $firebase(firebaseObj);
        $scope.platilloToUpdate = syn.$asObject();

        $('#editModalPlatillo').modal();
    }

    $scope.updatePlatillo = function() {
        console.log($scope.platilloToUpdate.$id);
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos/" + $scope.platilloToUpdate.$id);
        var platillo = $firebase(fb);
        platillo.$update({
            title: $scope.platilloToUpdate.title,
            description: $scope.platilloToUpdate.description,
            tipo: $scope.platilloToUpdate.tipo
        }).then(function(ref) {
            console.log(ref.key()); // bar
            $('#editModalPlatillo').modal('hide')
        }, function(error) {
            console.log("Error:", error);
        });

    }

    $scope.confirmDeletePlatillo = function(id) {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos/" + id);
        var platillo = $firebase(fb);
        $scope.platilloToDelete = platillo.$asObject();
        $('#deleteModalPlatillo').modal();
    }

    $scope.deletePlatillo = function() {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos/" + $scope.platilloToDelete.$id);
        var platillo = $firebase(fb);
        platillo.$remove().then(function(ref) {
            $('#deleteModalPlatillo').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }



    // Pastas

    $scope.editPasta = function(id) {
        console.log(id);
        var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Pastas/" + id);


        var syn = $firebase(firebaseObj);
        $scope.pastaToUpdate = syn.$asObject();

        $('#editModalPasta').modal();
    }

    $scope.updatePasta = function() {
        console.log($scope.pastaToUpdate.$id);
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Pastas/" + $scope.pastaToUpdate.$id);
        var pasta = $firebase(fb);
        pasta.$update({
            title: $scope.pastaToUpdate.title,
            description: $scope.pastaToUpdate.description
        }).then(function(ref) {
            console.log(ref.key()); // bar
            $('#editModalPasta').modal('hide')
        }, function(error) {
            console.log("Error:", error);
        });

    }

    $scope.confirmDeletePasta = function(id) {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Pastas/" + id);
        var pasta = $firebase(fb);
        $scope.pastaToDelete = pasta.$asObject();
        $('#deleteModalPasta').modal();
    }

    $scope.deletePasta = function() {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Pastas/" + $scope.pastaToDelete.$id);
        var pasta = $firebase(fb);
        pasta.$remove().then(function(ref) {
            $('#deleteModalPasta').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }


    // Sopas

    $scope.editSopa = function(id) {
        console.log(id);
        var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Sopas/" + id);


        var syn = $firebase(firebaseObj);
        $scope.sopaToUpdate = syn.$asObject();

        $('#editModalSopa').modal();
    }

    $scope.updateSopa = function() {
        console.log($scope.sopaToUpdate.$id);
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Sopas/" + $scope.sopaToUpdate.$id);
        var sopa = $firebase(fb);
        sopa.$update({
            title: $scope.sopaToUpdate.title,
            description: $scope.sopaToUpdate.description
        }).then(function(ref) {
            console.log(ref.key()); // bar
            $('#editModalSopa').modal('hide')
        }, function(error) {
            console.log("Error:", error);
        });

    }

    $scope.confirmDeleteSopa = function(id) {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Sopas/" + id);
        var sopa = $firebase(fb);
        $scope.sopaToDelete = sopa.$asObject();
        $('#deleteModalSopa').modal();
    }

    $scope.deleteSopa = function() {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Sopas/" + $scope.sopaToDelete.$id);
        var sopa = $firebase(fb);
        sopa.$remove().then(function(ref) {
            $('#deleteModalSopa').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }


    // Aguas

    $scope.editAgua = function(id) {
        console.log(id);
        var firebaseObj = new Firebase("https://laparrillaexpressapp.firebaseio.com/Aguas/" + id);


        var syn = $firebase(firebaseObj);
        $scope.aguaToUpdate = syn.$asObject();

        $('#editModalAgua').modal();
    }

    $scope.updateAgua = function() {
        console.log($scope.aguaToUpdate.$id);
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Aguas/" + $scope.aguaToUpdate.$id);
        var agua = $firebase(fb);
        agua.$update({
            title: $scope.aguaToUpdate.title,
            description: $scope.aguaToUpdate.description
        }).then(function(ref) {
            console.log(ref.key()); // bar
            $('#editModalAgua').modal('hide')
        }, function(error) {
            console.log("Error:", error);
        });

    }

    $scope.confirmDeleteAgua = function(id) {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Aguas/" + id);
        var agua = $firebase(fb);
        $scope.aguaToDelete = agua.$asObject();
        $('#deleteModalAgua').modal();
    }

    $scope.deleteAgua = function() {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Aguas/" + $scope.aguaToDelete.$id);
        var agua = $firebase(fb);
        agua.$remove().then(function(ref) {
            $('#deleteModalAgua').modal('hide');
        }, function(error) {
            console.log("Error:", error);
        });
    }

}]);
