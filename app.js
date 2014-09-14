'use strict';


var app = angular.module('sampleApp', ['firebase', 'ngRoute', 'ui.bootstrap']);

app.controller("SampleCtrl", function($scope, $firebase, 
  $firebaseSimpleLogin) {

  var ref = new Firebase("https://popping-torch-3987.firebaseio.com/messages");
  var sync = $firebase(ref);
  $scope.messages = sync.$asArray();
  $scope.addMessage = function(text) {
    $scope.messages.$add({text: text});
  }

  var authClient = $firebaseSimpleLogin(ref);
  // log user in using the Facebook provider for Simple Login

  $scope.loginWithFacebook = function() {
      authClient.$login('facebook').then(function(user) {
      console.log(user)
      $scope.user = user
    }, function(error) {
      console.error('Login failed: ' + error);
    });
  }

});

app.controller('LoginCtrl', function($scope){
  console.log("login ctrl!")
})

app.controller('AccordionDemoCtrl', function($scope) {
  $scope.oneAtATime = false;

  $scope.doctors = [
    {
      name: 'Dr. Bob Hotchkiss',
      content: 'Dr. Hotchkiss is far and away the best hand doctor in the US today. Lorem ipsum dolor sit amet, fermentum rutrum mollit tempor dicta. Non sagittis fames, nullam nec wisi cras temporibus wisi, bibendum ut viverra ultricies, laoreet sit feugiat et feugiat',
      type: 'Orthopedic Surgery',
      address: '523 East 72nd Street, New York, NY, 10021',
      phone_number: '203-869-2245',
      rating: 4.9,
      distance: 10,
      friends: 43
    },
    {
      name: 'Dr. Ted Kearny',
      content: 'I really like Pizza',
      type: 'Pediatritian',
      address: '100 Maher Avenue, Greenwich, CT, 06830',
      phone_number: '203-869-2245',
      rating: 1.2,
      distance: 27,
      friends: 10
    }, 
    {
      name: 'Dr. Eric Blair',
      content: 'Lorem ipsum dolor sit amet, fermentum rutrum mollit tempor dicta. Non sagittis fames, nullam nec wisi cras temporibus wisi, bibendum ut viverra ultricies, laoreet sit feugiat et feugiat. ',
      type: 'Anesthesiology',
      address: '523 East 72nd Street, New York, NY, 10021',
      phone_number: '203-869-2245',
      rating: 4.3,
      distance: 12,
      friends: 18
    },
    {
      name: 'Dr. Dave Matthews',
      content: 'Mi eu ipsum sodales dignissim eu nibh, nisl velit eget penatibus non, ut sit orci, augue faucibus commodo. Hendrerit ac velit urna, interdum felis eu earum nulla sed adipiscing. ',
      type: 'Pathology',
      address: '523 East 72nd Street, New York, NY, 10021',
      phone_number: '203-869-2245',
      rating: 4.5,
      distance: 10,
      friends: 11
    }
  ];

  $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };
})


app.config(function($routeProvider) {
    $routeProvider
    .when('/',
      {
        templateUrl: 'views/main.html',
        controller: 'SampleCtrl'
      })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl'
    })

})