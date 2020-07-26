angular.module('kipedido')

	.config(function ($routeProvider) {
		$routeProvider
			.when('/home', {
				templateUrl: 'home.html',
				controller: 'homeController'
			});
	})

	.controller('homeController', ['$scope', '$cookies', 'Login', '$http', 'Upload', function ($scope, $cookies, Login, $http, Upload) {

	}]);