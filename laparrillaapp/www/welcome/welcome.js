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

        $('#editModalPlatillo').openModal();
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
            $('#editModalPlatillo').closeModal()
        }, function(error) {
            console.log("Error:", error);
        });

    }

    $scope.confirmDeletePlatillo = function(id) {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos/" + id);
        var platillo = $firebase(fb);
        $scope.platilloToDelete = platillo.$asObject();
        $('#deleteModalPlatillo').openModal();
    }

    $scope.deletePlatillo = function() {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos/" + $scope.platilloToDelete.$id);
        var platillo = $firebase(fb);
        platillo.$remove().then(function(ref) {
            $('#deleteModalPlatillo').closeModal();
        }, function(error) {
            console.log("Error:", error);
        });
    }


    $scope.disablePlatillo = function(id) {
        console.log(id);
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos/" + id);
        var platillo = $firebase(fb);
        platillo.$update({
            activo: false
        }).then(function(ref) {
            console.log(ref.key()); // bar
        }, function(error) {
            console.log("Error:", error);
        });
    }


    $scope.enablePlatillo = function(id) {
        console.log(id);
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Platillos/" + id);
        var platillo = $firebase(fb);
        platillo.$update({
            activo: true
        }).then(function(ref) {
            console.log(ref.key()); // bar
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

        $('#editModalPasta').openModal();
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
            $('#editModalPasta').closeModal()
        }, function(error) {
            console.log("Error:", error);
        });

    }

    $scope.confirmDeletePasta = function(id) {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Pastas/" + id);
        var pasta = $firebase(fb);
        $scope.pastaToDelete = pasta.$asObject();
        $('#deleteModalPasta').openModal();
    }

    $scope.deletePasta = function() {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Pastas/" + $scope.pastaToDelete.$id);
        var pasta = $firebase(fb);
        pasta.$remove().then(function(ref) {
            $('#deleteModalPasta').closeModal();
        }, function(error) {
            console.log("Error:", error);
        });
    }


    $scope.disablePasta = function(id) {
        console.log(id);
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Pastas/" + id);
        var pasta = $firebase(fb);
        pasta.$update({
            activo: false
        }).then(function(ref) {
            console.log(ref.key()); // bar
        }, function(error) {
            console.log("Error:", error);
        });
    }


    $scope.enablePasta = function(id) {
        console.log(id);
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Pastas/" + id);
        var pasta = $firebase(fb);
        pasta.$update({
            activo: true
        }).then(function(ref) {
            console.log(ref.key()); // bar
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

        $('#editModalSopa').openModal();
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
            $('#editModalSopa').closeModal()
        }, function(error) {
            console.log("Error:", error);
        });

    }

    $scope.confirmDeleteSopa = function(id) {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Sopas/" + id);
        var sopa = $firebase(fb);
        $scope.sopaToDelete = sopa.$asObject();
        $('#deleteModalSopa').openModal();
    }

    $scope.deleteSopa = function() {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Sopas/" + $scope.sopaToDelete.$id);
        var sopa = $firebase(fb);
        sopa.$remove().then(function(ref) {
            $('#deleteModalSopa').closeModal();
        }, function(error) {
            console.log("Error:", error);
        });
    }


    $scope.disableSopa = function(id) {
        console.log(id);
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Sopas/" + id);
        var sopa = $firebase(fb);
        sopa.$update({
            activo: false
        }).then(function(ref) {
            console.log(ref.key()); // bar
        }, function(error) {
            console.log("Error:", error);
        });
    }


    $scope.enableSopa = function(id) {
        console.log(id);
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Sopas/" + id);
        var sopa = $firebase(fb);
        sopa.$update({
            activo: true
        }).then(function(ref) {
            console.log(ref.key()); // bar
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

        $('#editModalAgua').openModal();
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
            $('#editModalAgua').closeModal()
        }, function(error) {
            console.log("Error:", error);
        });

    }

    $scope.confirmDeleteAgua = function(id) {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Aguas/" + id);
        var agua = $firebase(fb);
        $scope.aguaToDelete = agua.$asObject();
        $('#deleteModalAgua').openModal();
    }

    $scope.deleteAgua = function() {
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Aguas/" + $scope.aguaToDelete.$id);
        var agua = $firebase(fb);
        agua.$remove().then(function(ref) {
            $('#deleteModalAgua').closeModal();
        }, function(error) {
            console.log("Error:", error);
        });
    }


    $scope.disableAgua = function(id) {
        console.log(id);
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Aguas/" + id);
        var agua = $firebase(fb);
        agua.$update({
            activo: false
        }).then(function(ref) {
            console.log(ref.key()); // bar
        }, function(error) {
            console.log("Error:", error);
        });
    }


    $scope.enableAgua = function(id) {
        console.log(id);
        var fb = new Firebase("https://laparrillaexpressapp.firebaseio.com/Aguas/" + id);
        var agua = $firebase(fb);
        agua.$update({
            activo: true
        }).then(function(ref) {
            console.log(ref.key()); // bar
        }, function(error) {
            console.log("Error:", error);
        });
    }

}]);
