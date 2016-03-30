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
        controller: 'MainCtrl'
    })
    .state('adddata', {
        url: '/adddata',
        templateUrl: 'templates/adddata.html',
        controller: 'adddataCtrl'
    })
    .state('chooseroute', {
        url: '/chooseroute',
        templateUrl: 'templates/chooseroute.html',
        controller: 'chooseRouteCtrl'
    })
    .state('onroute', {
        url: '/onroute',
        templateUrl: 'templates/onroute.html',
        controller: 'chooseRouteCtrl'
    })
    .state('endroute', {
        url: '/endroute',
        templateUrl: 'templates/endroute.html',
        controller: 'chooseRouteCtrl'
    })
    .state('setting', {
        url: '/setting',
        templateUrl: 'templates/setting.html',
        controller: 'settingCtrl'
    })
    .state('statistic', {
        url: '/statistic',
        templateUrl: 'templates/statistic.html',
        controller: 'statCtrl'
    })
    .state('routesearch', {
        url: '/routesearch',
        templateUrl: 'templates/routesearch.html',
        controller: 'routeCtrl'
    })
    .state('rankroute', {
        url: '/rankroute',
        templateUrl: 'templates/rankroute.html',
        controller: 'routeCtrl'
    })
    .state('acride', {
        url: '/acride',
        templateUrl: 'templates/activitieride.html',
        controller: 'acrCtrl'
    })
    .state('recentactivities', {
        url: '/recentactivities',
        templateUrl: 'templates/recentactivities.html',
        controller: 'rcaCtrl'
    })
    .state('groupactivites', {
        url: '/groupactivites',
        templateUrl: 'templates/groupactivites.html',
        controller: 'groupCtrl'
    })
    .state('addnamelocation', {
        url: '/addnamelocation',
        templateUrl: 'templates/addnamelocation.html',
        controller: 'anlCtrl'
    })
    .state('addgroup', {
        url: '/addgroup',
        templateUrl: 'templates/addgroups.html',
        controller: 'groupCtrl'
    })
     .state('alert', {
        url: '/alert',
        templateUrl: 'templates/alert.html',
        controller: 'alertCtrl'
    })
     .state('alertsystem', {
        url: '/alertsystem',
        templateUrl: 'templates/alertsystem.html',
        controller: 'alertCtrl'
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
        window.localStorage.clear();
        $state.go('adddata');
    }
    $scope.toMain = function(){
    $state.go('adddata');
    };
  
})
.controller("MainCtrl", function($scope,$state,$ionicPopover,$ionicSlideBoxDelegate) {
        $scope.buttonType = "icon ion-plus";
        $scope.buttonDisable = false;
        $scope.btncolor = "grey";

        $scope.addclick = function () {
                    $scope.buttonDisable = false;
                    $scope.buttonType = "icon ion-checkmark-circled";
                    $scope.btncolor = "blue";
                
        }
        $scope.logout = function(){
        var logouts = new Firebase("https://larav.firebaseio.com/users");
        logouts.unauth();
        window.localStorage.clear();
        $state.go('login');
        $scope.popover.hide();
        }
        $scope.tosetting = function(){
        $state.go('setting');
        $scope.popover.hide();
        }
        $scope.toAlert = function(){
        $state.go('alert');
        $scope.popover.hide();
        }
        $ionicPopover.fromTemplateUrl('templates/popover.html', {
        scope: $scope,
        }).then(function(popover) {
        $scope.popover = popover;
        })
        $scope.chooseroutes = function(){
        $state.go('chooseroute');
        }

        // $scope.slideIndex = 0;

        //     // Called each time the slide changes
        // $scope.slideChanged = function(index) {
        //     $scope.slideIndex = index;
        //     console.log("slide Change");

        //     if ($scope.slideIndex == 0){
        //         console.log("slide 1");
        //     }

        //     else if ($scope.slideIndex == 1){
        //         console.log("slide 2");
        //     }

        //     else if ($scope.slideIndex == 2){
        //         console.log("slide 3");
        //     }
        //     else if ($scope.slideIndex == 3){
        //         console.log("slide 3");
        //     }

        // }

        // $scope.activeSlide = function (index) {
        //     $ionicSlideBoxDelegate.slide(index);
        // };
        $scope.gostat = function () {
            $state.go('statistic');
        }
        $scope.goroute = function () {
            $state.go('routesearch');
        }
        $scope.goacr = function () {
            $state.go('acride');
        }
        $scope.gorca = function () {
            $state.go('recentactivities');
        }
        $scope.gogroup = function () {
            $state.go('groupactivites');
        }
        $scope.addgroups = function(){
            $state.go('addgroup');
        };

})
.controller("adddataCtrl", function($scope,$state) {
        $scope.logout = function(){
        var logouts = new Firebase("https://larav.firebaseio.com/users");
        logouts.unauth();
        window.localStorage.clear();
        $state.go('login');
        }
        $scope.goMain = function(){
        $state.go('main');
        };
})
.controller("chooseRouteCtrl", function($scope,$state) {
        $scope.goMain = function(){
        $state.go('main');
        };
        $scope.goonroute = function(){
        $state.go('onroute');
        };
        $scope.goendroute = function(){
        $state.go('endroute');
        };
})
.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
      function initialize() {
        var myLatlng = new google.maps.LatLng(13.731169,100.781184);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      
})
.controller("settingCtrl", function($scope,$state) {
        $scope.goMain = function(){
        $state.go('main');
        };
})
.controller("statCtrl", function($scope,$state) {
        $scope.goMain = function(){
        $state.go('main');
        };
})
.controller("routeCtrl", function($scope,$state) {
        $scope.goMain = function(){
        $state.go('main');
        }
         $scope.gorank = function(){
        $state.go('rankroute');
        }
        $scope.goroute = function () {
            $state.go('routesearch');
        };

})
.controller("acrCtrl", function($scope,$state) {
        $scope.goMain = function(){
        $state.go('main');
        }
        $scope.addnameroutes = function(){
        $state.go('addnamelocation');
        };
})
.controller("rcaCtrl", function($scope,$state) {
        $scope.goMain = function(){
        $state.go('main');
        }
})
.controller("groupCtrl", function($scope,$state) {
        $scope.goMain = function(){
        $state.go('main');
        }
})
.controller("addgroup", function($scope,$state) {
        $scope.goMain = function(){
        $state.go('main');
        }
})
.controller("anlCtrl", function($scope,$state) {
        $scope.goMain = function(){
        $state.go('main');
        }
})
.controller("alertCtrl", function($scope,$state) {
        $scope.goMain = function(){
        $state.go('main');
        }
        $scope.toAlertSystem = function(){
        $state.go('alertsystem');
        };
});


