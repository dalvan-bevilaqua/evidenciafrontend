var app = angular.module('kipedido', ['ngRoute', 'ngCookies', 'ngFileUpload']);

app.config(function ($routeProvider) {
	$routeProvider
		.when('/home', {
			template: 'index.html',
			name: 'homeController'
		})

})
	.controller('homeController', ['$scope', '$cookies', 'Login', '$http', function ($scope, $cookies, Login, $http) {
		//Login.validation();
	}]);