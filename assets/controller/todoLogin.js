var myApp = angular.module('myApp',['ngCookies']);

myApp.controller('loginController', function($scope,$http,$cookies) {

	$scope.Login = function(){
		if ($scope.user == undefined || $scope.password == undefined){
			return
		}
			$http({
			url: "http://blog-kipedido-com.umbler.net/getTokenByUserAndPasswordEmpresa",
			method: "POST",
			data: {
				'user':$scope.user, 
				'password':$scope.password
			}
		})
		.then(function(response) {
			if (response.data!='0'){
				$cookies.put('token', response.data);
				window.location.href='http://kipedido-com.umbler.net/administrator/#!/home';
				
			}else{
				alert('Usuário ou Senha Inválidos.');
			}
		}); 
	};
	$scope.loginForUser = function(){
		if ($scope.user == undefined || $scope.password == undefined){
			return
		}
			$http({
			url: "http://blog-kipedido-com.umbler.net/getTokenByUserAndPasswordUser",
			method: "POST",
			data: {
				'user':$scope.user, 
				'password':$scope.password
			}
		})
		.then(function(response) {
			if (response.data!='0'){
				console.log(response.data)
				$cookies.put('token', response.data);
				window.location.href='http://kipedido-com.umbler.net/administrator/user/app/index.html';
			}else{
				alert('Usuário ou Senha Inválidos.');
			}
		});
	};

	$scope.register = function(){
		if ($scope.user == undefined || $scope.password == undefined){
			return
		}
		$http({
			url: "http://blog-kipedido-com.umbler.net/saveLoginUser",
			method: "POST",
			data: {
				'user':$scope.user, 
				'password':$scope.password
			}
		})
		.then(function(response) {
			if (response.data!='Usuário já consta na base de dados, Favor tentar com outro usuário.'){
				alert('Usuário cadastrado com sucesso, Efefue o login para continuar');
			}else{
				alert(response.data);
			}
		}); 
	};

	$scope.redirect = function(){
		window.location.href='admin/administrator/#!/home';
	}
	
});