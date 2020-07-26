
angular.module('kipedido')

.config(function($routeProvider) {
	$routeProvider
		.when('/sair', {
			templateUrl: 'home.html',
			controller: 'sairController'
		});
})

.controller('sairController', ['$cookies','Login', function($cookies,Login) {
	$cookies.put('token','0');
	Login.validation();
	//$cookies.put('username', 'dalvan.bevilaqua@hotmail.com');
}]);