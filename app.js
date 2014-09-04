'use strict';


var app = angular.module('sampleApp', ['firebase', 'ngRoute']);

app.controller("SampleCtrl", function($scope, $firebase, 
  $firebaseSimpleLogin) {

  var ref = new Firebase("https://popping-torch-3987.firebaseio.com/messages");
  var sync = $firebase(ref);
  $scope.messages = sync.$asArray();
  console.log($scope.messages)
  $scope.addMessage = function(text) {
    $scope.messages.$add({text: text});
  }

  var authClient = $firebaseSimpleLogin(ref);
  // log user in using the Facebook provider for Simple Login

  $scope.loginWithFacebook = function() {
      authClient.$login('facebook').then(function(user) {
      console.log(user)
      $scope.user = user
       console.log($scope.user.displayName)
    }, function(error) {
      console.error('Login failed: ' + error);
    });
  }

});


// app.config(function($routeProvider) {
//     $routeProvider
//     .when('/',
//       {
//         templateUrl: 'index.html',
//         controller: 'SampleCtrl'
//       })
//     .when('/login', {
//       templateUrl: 'views/login.html',
//       controller: 'LoginCtrl'
//     })

// })