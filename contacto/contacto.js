'use strict';

angular.module('myApp.contacto', ['ngRoute'])

.controller('contactoCtrl', ['$scope', '$firebase','$location', 'CommonProp', function($scope, $firebase, $location ,CommonProp) {
   
    $scope.username = CommonProp.getUser();

    if(!$scope.username){
        $location.path('/home');
    }


}]);
