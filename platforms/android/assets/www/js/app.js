// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
angular.module('starter', ['ionic','firebase'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
   
  });
})

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
    })
      .state('main', {
        url: '/main',
        templateUrl: 'templates/main.html',
        controller: 'LoginCtrl'
    });
    $urlRouterProvider.otherwise('/');
})

.factory("Auth", function($firebaseAuth) {
      var AuthRef = new Firebase("https://larav.firebaseio.com");
      return $firebaseAuth(AuthRef);
})
.factory("Users", function($firebaseArray) {
      var UsersRef = new Firebase("https://larav.firebaseio.com/users");
      return $firebaseArray(UsersRef);
})

.controller("LoginCtrl", function($scope,$state,Auth,Users,$ionicPopup, $timeout) {
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady()
    {
            screen.lockOrientation('portrait');    
    }
 
    $scope.facebooklogin = function() {
       
          Auth.$authWithOAuthRedirect("facebook",function(authData) {
            // User successfully logged in
              
              console.log(authData);
          }).catch(function(error) {
              if (error.code === "TRANSPORT_UNAVAILABLE") {
                  Auth.$authWithOAuthPopup("facebook").then(function(authData) {
                   // User successfully logged in. We can log to the console
                   // since we’re using a popup here
                     
                  console.log(authData);
            });
              } else {
                // Another error occurred
                   console.log(error);
                }
          })
           var showloadinPopup = $ionicPopup.show({
                template: 'Are you sure you want to eat this ice cream?'
              });
              $timeout(function() {
              showloadinPopup.close(); 
          }, 5000);
    };
    $scope.twitterlogin = function() {
  
          Auth.$authWithOAuthRedirect("twitter",function(authData) {
            // User successfully logged in
          console.log(authData1);
          }).catch(function(error) {
            if (error.code === "TRANSPORT_UNAVAILABLE") {
              Auth.$authWithOAuthPopup("twitter").then(function(authData) {
              // User successfully logged in. We can log to the console
              // since we’re using a popup here
      
              console.log(authData);
            });
            } else {
        // Another error occurred
              console.log(error);
            }
          })
    
    };
          Auth.$onAuth(function(authData) {
          if (authData === null) {
              
            console.log("Not logged in yet");
          } else {
            $state.go('main');
            console.log("Logged in as", authData.uid);
          }
            $scope.authData = authData; 
            $scope.user = Users;
             $scope.user.$add({
              "id" : authData.facebook.id,
              "name" : authData.facebook.displayName,
              "Url" : authData.facebook.profileImageURL
              })
  // This will display the user's name in our view
          });

    $scope.logout = function(){
        var logouts = new Firebase("https://larav.firebaseio.com/users");
        logouts.unauth();
        $state.go('login');
    };
  
});



