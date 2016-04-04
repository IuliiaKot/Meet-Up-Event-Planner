'use strict';

angular.module('myApp.home', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])

.controller('HomeCtrl', ['$scope','$location','CommonProp','$firebaseAuth',function($scope,$location,CommonProp,$firebaseAuth) {

  var firebaseObj = new Firebase("https://event-manager-app.firebaseio.com/");
  var loginObj = $firebaseAuth(firebaseObj);

  var login = {};
  $scope.login = login;

  $scope.user = {};
  $scope.SignIn = function(e) {
    e.preventDefault();
    var username = $scope.user.email;
    var password = $scope.user.password;
    login.loading = true;
    loginObj.$authWithPassword({
            email: username,
            password: password
        })
        .then(function(user) {
            //Success callback
            console.log('Authentication successful');
            login.loading = false;
	          CommonProp.setUser(user.password.email);
		        $location.path('/welcome');
        }, function(error) {
            //Failure callback
            login.loading = false;
            console.log('Authentication failure');
        });
}
}])
.service('CommonProp', ['$location','$firebaseAuth', function($location, $firebaseAuth) {
    var user = '';
    var firebaseObj = new Firebase("https://event-manager-app.firebaseio.com/Events");
    var loginObj = $firebaseAuth(firebaseObj);

    return {
        getUser: function() {
          if(user == ''){
            console.log(user);
            user = localStorage.getItem('userEmail');
          }
          return user;
        },
        setUser: function(value) {
          localStorage.setItem("userEmail", value);
          user = value;
        },
        logoutUser:function(){
          loginObj.$unauth();
          user = '';
          localStorage.clear();
          console.log('done logout');
          $location.path('/home');
        }
    };
}])
.directive('laddaLoading', [
    function() {
        return {
            link: function(scope, element, attrs) {
                var Ladda = window.Ladda;
                var ladda = Ladda.create(element[0]);
                scope.$watch(attrs.laddaLoading, function(newVal, oldVal) {
                    // Based on the value start and stop the indicator
                    if (newVal) {
                        ladda.start();
                    } else {
                        ladda.stop();
                    }
                });
            }
        };
    }
]);
