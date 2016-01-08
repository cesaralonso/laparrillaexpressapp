'use strict';

angular.module('myApp.welcome', ['ngRoute'])


.controller('WelcomeCtrl', ['$scope', '$firebase','$location', 'CommonProp', function($scope, $firebase, $location ,CommonProp) {
    $scope.username = CommonProp.getUser();

   // $scope.username = CommonProp.getUser();


  
    $scope.CurrentDate = new Date();

 
    if(!$scope.username){
        $location.path('/home');
    }

    var firebaseObj = new Firebase("https://blistering-heat-2473.firebaseio.com/Articles/");


    var sync = $firebase(firebaseObj.startAt($scope.username).endAt($scope.username));

    $scope.articles = sync.$asArray();
    console.log(sync);




}]);
